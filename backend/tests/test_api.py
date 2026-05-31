import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "teacher" in response.json()["agents"]


def test_curriculum_has_twenty_modules():
    response = client.get("/api/curriculum/a1")
    assert response.status_code == 200
    assert len(response.json()["modules"]) == 20


def test_correction():
    response = client.post("/api/correction", json={"text": "ich gehen nach Berlin"})
    assert response.status_code == 200
    assert "ich gehe" in response.json()["correct_sentence"]

