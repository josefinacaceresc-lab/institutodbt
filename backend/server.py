from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev').strip()
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'contacto@dbtchile.cl').strip()

try:
    import resend  # type: ignore
    if RESEND_API_KEY:
        resend.api_key = RESEND_API_KEY
    RESEND_AVAILABLE = True
except Exception:
    RESEND_AVAILABLE = False

app = FastAPI(title="Instituto DBT Chile API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ─── Models ─────────────────────────────────────────────
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    message: Optional[str] = Field(default=None, max_length=2000)
    program: Optional[str] = Field(default=None, max_length=80)


class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: Optional[str] = None
    program: Optional[str] = None
    email_status: str  # sent | pending | failed
    created_at: datetime


# ─── Email helpers ──────────────────────────────────────
def _build_lead_email_html(lead: dict) -> str:
    safe = {k: (str(v) if v is not None else '') for k, v in lead.items()}
    return f"""
    <div style="font-family:Arial,Helvetica,sans-serif;background:#F5F1EA;padding:32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #CEC5B2;">
        <tr>
          <td style="background:#0E2333;padding:28px 32px;">
            <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#BFA06A;">Instituto DBT Chile</div>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-family:Georgia,serif;">Nueva consulta desde el sitio</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;color:#1C1C1C;">
            <p style="margin:0 0 16px;font-size:14px;color:#3D3D3D;">Se ha recibido una nueva solicitud de contacto:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#1C1C1C;">
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;width:130px;"><strong>Nombre</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['name']}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['email']}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;"><strong>Teléfono</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['phone'] or '—'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;"><strong>Programa</strong></td><td style="padding:8px 0;border-bottom:1px solid #EDE7DB;">{safe['program'] or '—'}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#F5F1EA;border-left:3px solid #BFA06A;font-size:14px;color:#3D3D3D;white-space:pre-wrap;">{safe['message'] or '(sin mensaje)'}</div>
            <p style="margin:24px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#BFA06A;">Lead ID · {safe['id']}</p>
          </td>
        </tr>
      </table>
    </div>
    """


async def _send_lead_email(lead: dict) -> str:
    """Returns: 'sent' | 'pending' | 'failed'."""
    if not RESEND_API_KEY or not RESEND_AVAILABLE:
        logger.info("Resend API key not configured — email marked as pending.")
        return "pending"
    try:
        params = {
            "from": f"Instituto DBT Chile <{SENDER_EMAIL}>",
            "to": [NOTIFICATION_EMAIL],
            "reply_to": lead.get("email"),
            "subject": f"Nueva consulta — {lead.get('name', 'Sin nombre')}",
            "html": _build_lead_email_html(lead),
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Lead email sent. id={result.get('id') if isinstance(result, dict) else result}")
        return "sent"
    except Exception as e:
        logger.error(f"Resend error: {e}")
        return "failed"


# ─── Routes ─────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "Instituto DBT Chile API"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(RESEND_API_KEY) and RESEND_AVAILABLE,
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactLead, status_code=201)
async def create_contact_lead(payload: ContactLeadCreate):
    lead_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    doc = {
        "id": lead_id,
        "name": payload.name.strip(),
        "email": payload.email,
        "phone": (payload.phone or '').strip() or None,
        "message": (payload.message or '').strip() or None,
        "program": (payload.program or '').strip() or None,
        "created_at": now.isoformat(),
        "email_status": "pending",
    }

    # Persist first (source of truth)
    try:
        await db.leads.insert_one({**doc})
    except Exception as e:
        logger.error(f"MongoDB insert failed: {e}")
        raise HTTPException(status_code=500, detail="No se pudo guardar la consulta")

    # Send email (best effort)
    email_status = await _send_lead_email(doc)
    if email_status != doc["email_status"]:
        await db.leads.update_one({"id": lead_id}, {"$set": {"email_status": email_status}})
        doc["email_status"] = email_status

    return ContactLead(
        id=doc["id"],
        name=doc["name"],
        email=doc["email"],
        phone=doc["phone"],
        message=doc["message"],
        program=doc["program"],
        email_status=doc["email_status"],
        created_at=now,
    )


@api_router.get("/contact", response_model=List[ContactLead])
async def list_contact_leads(limit: int = 100):
    cursor = db.leads.find({}, {"_id": 0}).sort("created_at", -1).limit(max(1, min(limit, 500)))
    rows = await cursor.to_list(length=limit)
    out: List[ContactLead] = []
    for r in rows:
        ca = r.get("created_at")
        if isinstance(ca, str):
            try:
                ca = datetime.fromisoformat(ca)
            except Exception:
                ca = datetime.now(timezone.utc)
        out.append(ContactLead(
            id=r.get("id", str(uuid.uuid4())),
            name=r.get("name", ""),
            email=r.get("email", "unknown@example.com"),
            phone=r.get("phone"),
            message=r.get("message"),
            program=r.get("program"),
            email_status=r.get("email_status", "pending"),
            created_at=ca or datetime.now(timezone.utc),
        ))
    return out


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
