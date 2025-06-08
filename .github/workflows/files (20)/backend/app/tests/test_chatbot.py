import pytest
import asyncio
from backend.app.chatbot.core import get_chat_response

@pytest.mark.asyncio
async def test_get_chat_response():
    user_message = "¿Qué es un NFT?"
    response = await get_chat_response(user_message)
    assert isinstance(response, str)
    assert len(response) > 0