# MELANO IRA™ Backend

## Setup

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Agrega tu clave OpenAI real
uvicorn app.main:app --reload
```

## Tests

```sh
pytest
```

## Producción

- Usa Docker, Railway, ECS, Render, etc.
- Limita CORS en prod.
- Mantén la clave OpenAI solo en `.env` (no subir a git).