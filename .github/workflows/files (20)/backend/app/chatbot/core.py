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

ModuleNotFoundError: This app has encountered an error. The original error message is redacted to prevent data leaks. Full error details have been recorded in the logs (if you're on Streamlit Cloud, click on 'Manage app' in the lower right of your app).
Traceback:
File "/mount/src/melania/.github/workflows/files (20)/backend/app/chatbot/core.py", line 2, in <module>
    import openai
