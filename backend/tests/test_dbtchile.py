"""Backend tests for Instituto DBT Chile API"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealth:
    def test_health_ok(self):
        r = requests.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        assert "email_configured" in data
        assert data["email_configured"] is False  # key is empty

    def test_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json()["message"] == "Instituto DBT Chile API"


class TestContact:
    def test_create_lead_valid(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Juan Pérez",
            "email": "test_juan@example.com",
            "phone": "+56912345678",
            "program": "DBT Estándar",
            "message": "Quiero más información."
        })
        assert r.status_code == 201
        data = r.json()
        assert "id" in data
        assert data["email_status"] == "pending"
        assert "created_at" in data
        assert data["name"] == "TEST_Juan Pérez"
        assert data["email"] == "test_juan@example.com"
        return data["id"]

    def test_create_lead_persists(self):
        # Create
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Persist Check",
            "email": "test_persist@example.com",
        })
        assert r.status_code == 201
        lead_id = r.json()["id"]
        # Verify via GET
        r2 = requests.get(f"{BASE_URL}/api/contact")
        assert r2.status_code == 200
        ids = [item["id"] for item in r2.json()]
        assert lead_id in ids

    def test_list_leads_no_mongo_id(self):
        r = requests.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        leads = r.json()
        for lead in leads:
            assert "_id" not in lead

    def test_list_leads_limit(self):
        r = requests.get(f"{BASE_URL}/api/contact?limit=2")
        assert r.status_code == 200
        assert len(r.json()) <= 2

    def test_invalid_email_returns_422(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Valid Name",
            "email": "not-an-email",
        })
        assert r.status_code == 422

    def test_short_name_returns_422(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "A",
            "email": "valid@example.com",
        })
        assert r.status_code == 422


class TestLegacy:
    def test_post_status(self):
        r = requests.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_client"})
        assert r.status_code == 200

    def test_get_status(self):
        r = requests.get(f"{BASE_URL}/api/status")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
