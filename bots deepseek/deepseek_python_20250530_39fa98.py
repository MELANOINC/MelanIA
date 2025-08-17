from fastapi import FastAPI, Depends
from fastapi.security import APIKeyHeader
import logging
from datetime import datetime

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MELANO INC Core API",
    description="API de bajo nivel para operaciones críticas",
    version="2.0",
    docs_url=None,  # Deshabilitar docs en producción
)

API_KEY_HEADER = APIKeyHeader(name="X-API-KEY")

# Simulación de API keys válidas
VALID_API_KEYS = {"MELANO_QUANTUM_KEY_2023"}

@app.get("/")
async def root(api_key: str = Depends(API_KEY_HEADER)):
    if api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=403, detail="API Key inválida")
    
    return {
        "service": "MELANO CORE",
        "status": "OPERATIONAL",
        "timestamp": datetime.utcnow().isoformat(),
        "security_level": "AES-256 + Quantum",
    }

@app.get("/status")
async def status_check():
    return {
        "version": "2.0",
        "dependencies": {
            "database": "active",
            "quantum_engine": "online",
            "security_layer": "enabled",
        },
    }