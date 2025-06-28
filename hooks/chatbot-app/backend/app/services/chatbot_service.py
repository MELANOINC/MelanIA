# File: /chatbot-app/chatbot-app/backend/app/services/chatbot_service.py

from app.core.openai_client import ask_openai
from app.models.message import Message

class ChatbotService:
    def __init__(self):
        pass

    def get_response(self, user_message: Message) -> str:
        prompt = user_message.content
        response = ask_openai(prompt)
        return response