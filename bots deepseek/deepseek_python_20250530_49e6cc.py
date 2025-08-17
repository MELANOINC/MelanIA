from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chatbot, dashboard, lead, federated_learning
from app.graphql_schema import graphql_router
from app.middleware.quantum_auth import QuantumAuthMiddleware

app = FastAPI(
    title="MELANO INC Quantum Analytics Platform",
    version="3.0",
    docs_url="/quantum-docs",
    redoc_url=None
)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.melano.inc"],
    allow_methods=["*"],
    allow_headers=["*"]
)
app.add_middleware(QuantumAuthMiddleware)

# Routers principales
app.include_router(federated_learning.router, prefix="/fl")
app.include_router(graphql_router, prefix="/graphql")

# Routers de módulos
app.include_router(chatbot.router, prefix="/ai")
app.include_router(dashboard.router, prefix="/analytics")
app.include_router(lead.router, prefix="/crm")

# Endpoint de estado Quantum
@app.get("/quantum-status")
async def quantum_status():
    return {
        "status": "quantum_entangled",
        "federated_learning": "active",
        "graphql": "online"
    }