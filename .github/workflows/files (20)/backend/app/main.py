from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from backend.app.chatbot.core import get_chat_response

app = FastAPI(
    title="MELANO IRA™ Chatbot API",
    description="API Backend para los agentes inteligentes MELANO IRA™"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Limita esto en prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    response = await get_chat_response(user_message)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)