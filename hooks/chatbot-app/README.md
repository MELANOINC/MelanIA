# Chatbot Application

## Overview
This project is a chatbot application built using Python with FastAPI for the backend and React for the frontend. It integrates with the OpenAI API to provide intelligent responses to user queries.

## Project Structure
```
chatbot-app
├── backend
│   ├── app
│   │   ├── api
│   │   │   └── chatbot.py
│   │   ├── core
│   │   │   └── openai_client.py
│   │   ├── models
│   │   │   └── message.py
│   │   ├── services
│   │   │   └── chatbot_service.py
│   │   ├── main.py
│   │   └── tests
│   │       └── test_chatbot.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   └── Chatbot.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Backend Setup
1. Navigate to the `backend` directory.
2. Create a `.env` file based on the `.env.example` template and add your OpenAI API key.
3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the FastAPI application:
   ```
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

## Frontend Setup
1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Docker Deployment
To deploy the application using Docker, follow these steps:

1. Ensure Docker is installed and running on your machine.
2. From the root of the project, build and run the containers:
   ```
   docker-compose up --build
   ```
3. Access the application at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.

## Usage
- Interact with the chatbot through the frontend interface.
- The chatbot will process your input and respond using the OpenAI API.

## Testing
To run the tests for the backend, navigate to the `backend` directory and execute:
```
pytest
```

## License
This project is licensed under the MIT License.