from fastapi import APIRouter
from pydantic import BaseModel
from sklearn.ensemble import RandomForestClassifier
import joblib

router = APIRouter(tags=["Leads"])

# Modelo de clasificación (cargar desde disco en producción)
clf = RandomForestClassifier()

class Lead(BaseModel):
    name: str
    email: str
    behavior_data: dict  # Datos de navegación/interacciones

@router.post("/lead/score")
async def score_lead(lead: Lead):
    # Vectorizar datos de comportamiento
    features = [
        lead.behavior_data.get("page_views", 0),
        lead.behavior_data.get("time_spent", 0)
    ]
    score = clf.predict_proba([features])[0][1]  # Probabilidad de conversión
    return {"lead_score": float(score)}