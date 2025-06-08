import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

async def get_chat_response(user_message: str) -> str:
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres MELANO IRA™, un agente IA experto en activos digitales, NFT y negocios Web3."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=200
        )
        return completion.choices[0].message["content"]
    except Exception as e:
        return f"Error en la IA: {str(e)}"