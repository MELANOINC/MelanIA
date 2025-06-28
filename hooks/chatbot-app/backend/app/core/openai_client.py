from openai import OpenAI

def create_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OpenAI API key not found in environment variables.")
    
    openai.api_key = api_key

create_openai_client()