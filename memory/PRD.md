# Instituto DBT Chile — Landing Page

## Problem Statement
"haz la landig page con esta informacion" — User uploaded `dbtchile-beta.zip`, a WordPress theme for
Instituto DBT Chile (mental-health clinic, único miembro WDBTA en Chile, dirigido por Dra. Josefina
Cáceres Cortés, Ph.D.). Convert the theme into a modern React landing page preserving the original
navy/gold luxury editorial design and all Spanish content.

## User Choices
- Save contact leads in MongoDB ✅
- Send email notifications via Resend ✅ (real integration wired; RESEND_API_KEY pending user)
- Functional WhatsApp button ✅
- Design: preserve WordPress theme aesthetic (navy #0E2333 / gold #BFA06A, DM Serif Display + DM Sans)

## Architecture
- **Backend**: FastAPI + MongoDB (motor). `/api/contact` POST persists lead then calls Resend via
  `asyncio.to_thread`. `email_status` = sent | pending | failed. Graceful degradation when key absent.
- **Frontend**: React 19 + shadcn/ui + sonner + lucide-react. Single-page landing with 10 sections.
  Smooth-scroll, IntersectionObserver fade-ups, mobile hamburger.
- **Email**: Resend SDK (python). Sender: `onboarding@resend.dev` until domain verified.
  Destination: `contacto@dbtchile.cl`.

## Core Requirements
- P0: Landing page replicating WP theme content (hero, pillars, programs, modules, schema,
  research, publications, team, testimonials, contact) — DONE
- P0: Contact form → MongoDB + email — DONE
- P0: Functional WhatsApp buttons (CTA + floating) — DONE
- P1: Resend domain verification + real key → enable email delivery — PENDING user action
- P2: Add Google Analytics / tracking
- P2: Admin view to browse leads (currently GET /api/contact available but unprotected)

## Implemented (2025-12)
- Backend `/api/contact` (POST/GET), `/api/health`, legacy `/api/status` preserved
- Full landing UI with all sections from the WP theme
- 100% backend tests passing, 100% frontend tests passing

## Next Tasks
- Obtain Resend API key + verify `dbtchile.cl` domain → set `RESEND_API_KEY` and `SENDER_EMAIL`
- Add admin auth for `/api/contact` GET endpoint
- Replace placeholder logo mark "D" with uploaded PNG logo when available
- Optional: integrate Contact Form 7-style double opt-in and ReCAPTCHA
