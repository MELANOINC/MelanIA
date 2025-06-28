import pytest
from app.api.chatbot import ask_openai

def test_ask_openai(mocker):
    mock_response = "This is a mock response from OpenAI."
    mock_prompt = "Hello, how are you?"

    mock_openai = mocker.patch('app.core.openai_client.openai.ChatCompletion.create')
    mock_openai.return_value.choices[0].message['content'] = mock_response

    response = ask_openai(mock_prompt)

    assert response == mock_response
    mock_openai.assert_called_once_with(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": mock_prompt}]
    )