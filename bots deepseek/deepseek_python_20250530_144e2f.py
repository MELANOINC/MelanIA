import openai
import os
from tenacity import retry, stop_after_attempt, wait_exponential
from app.core.security import decrypt_key

# Configuración segura con encriptación
OPENAI_KEY = decrypt_key(os.getenv("ENCRYPTED_OPENAI_KEY"))
openai.api_key = OPENAI_KEY

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
async def get_ai_response(
    message: str,
    model: str = "gpt-4-turbo",
    temperature: float = 0.7,
    system_prompt: str = "Eres un asistente especializado en finanzas cuánticas de MELANO INC."
) -> str:
    try:
        response = await openai.ChatCompletion.acreate(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            temperature=temperature
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(500, f"Error en AI: {str(e)}")