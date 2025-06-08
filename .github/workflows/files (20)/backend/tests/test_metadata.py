from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_level_up():
    response = client.post("/api/evolutive/1/levelup")
    assert response.status_code == 200
    assert response.json()["level"] == 1

    response = client.post("/api/evolutive/1/levelup")
    assert response.json()["level"] == 2

def test_custom_uri():
    uri = "https://example.com/image.png"
    response = client.post("/api/evolutive/1/custom_uri", params={"uri": uri})
    assert response.status_code == 200
    assert response.json()["custom_uri"] == uri

def test_get_metadata():
    response = client.get("/api/evolutive/1")
    assert response.status_code == 200
    data = response.json()["metadata"]
    assert "level" in data
    assert "custom_uri" in data