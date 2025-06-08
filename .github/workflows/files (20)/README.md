# MELANO IRA™ - Starter Web3 AI

## Estructura
- /backend: FastAPI + OpenAI Chatbot + tests
- /frontend: React functional chat
- /Dockerfile + docker-compose.yml: Despliegue “llave en mano”

## Cómo lanzar el proyecto

### 1. Clona y configura variables (.env)
### 2. Backend
```sh
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # agrega tu clave OpenAI
uvicorn app.main:app --reload
```
### 3. Frontend
```sh
cd frontend
npm install
npm start
```
### 4. Docker (opcional)
```sh
docker-compose up --build
```
---

## Producción

- Sube backend a AWS, Railway, Render, etc.
- Sube frontend a Vercel, Netlify, o tu VPS.
- Mantén tus claves seguras.

---
¿Listo para construir el futuro? 🚀