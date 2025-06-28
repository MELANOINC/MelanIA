from fastapi import APIRouter
from app.core.openai_client import openai_client

router = APIRouter()

@router.post("/chat")
async def ask_openai(prompt: str):
    response = openai_client.Completion.create(
        engine="davinci-codex",
        prompt=prompt,
        max_tokens=150
    )
    return {"response": response.choices[0].text.strip()}