from fastapi import Request, HTTPException
import jwt
import os

class QuantumAuthMiddleware:
    def __init__(self, app):
        self.app = app
        self.QUANTUM_SECRET = os.getenv("QUANTUM_SECRET", "melano_quantum_2025")

    async def __call__(self, request: Request, call_next):
        if request.url.path.startswith("/graphql") or request.url.path.startswith("/fl"):
            token = request.headers.get("X-Quantum-Token")
            if not token:
                raise HTTPException(401, "Quantum token required")
            
            try:
                payload = jwt.decode(token, self.QUANTUM_SECRET, algorithms=["HS256"])
                request.state.quantum_user = payload["sub"]
            except jwt.PyJWTError:
                raise HTTPException(401, "Invalid quantum token")
        
        response = await call_next(request)
        response.headers["X-Quantum-Protected"] = "true"
        return response

CS-Script: Detect and integrate CS-Script