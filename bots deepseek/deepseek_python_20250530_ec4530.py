from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np

router = APIRouter(tags=["Leads"])

class Lead(BaseModel):
    name: str
    email: str
    behavior_data: dict

async def get_scored_leads():
    """Obtener leads con scoring para GraphQL"""
    # Lógica real de base de datos
    return [{
        "name": f"Lead {i}",
        "email": f"lead{i}@example.com",
        "score": round(np.random.uniform(0.5, 0.95), 2),
        "conversion_prob": round(np.random.uniform(0.3, 0.8), 2)
    } for i in range(1, 11)]

@router.post("/lead")
async def submit_lead(lead: Lead):
    return {"message": "Lead enviado", "score": round(np.random.uniform(0.0, 1.0), 2)}