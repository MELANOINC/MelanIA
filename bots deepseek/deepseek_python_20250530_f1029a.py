from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chatbot, dashboard, lead, ml_routes
from app.middleware.security import SecurityHeadersMiddleware

app = FastAPI(
    title="MELANO INC Quantum API",
    version="2.0",
    docs_url="/quantum-docs"
)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://melano.inc"],  # Restringido en prod
    allow_methods=["GET", "POST"]
)
app.add_middleware(SecurityHeadersMiddleware)

# Routers
app.include_router(ml_routes.router, prefix="/quantum")
app.include_router(chatbot.router, prefix="/ai")
app.include_router(dashboard.router, prefix="/analytics")
app.include_router(lead.router, prefix="/crm")