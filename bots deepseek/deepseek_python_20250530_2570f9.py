from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.openai_client import get_ai_response
from app.ml.quantum_ml import QuantumTradingModel

router = APIRouter(tags=["AI"])
qt_model = QuantumTradingModel()

class ChatRequest(BaseModel):
    message: str
    is_trading_query: bool = False

@router.post("/chatbot")
async def chatbot_endpoint(request: ChatRequest):
    if request.is_trading_query:
        # Usar modelo de DL para preguntas de trading
        response = await qt_model.analyze_market(request.message)
    else:
        # Usar LLM para respuestas generales
        response = await get_ai_response(
            message=request.message,
            system_prompt="Eres un experto en MELANO INC. Responde en español."
        )
    return {"response": response}