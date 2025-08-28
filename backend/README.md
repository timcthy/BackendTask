# Survey Backend

The backend provides a survey-generation API. It works with a frontend React application to dynamically create surveys based on user-provided (and AI-generated) surveys. The backend is built using **FastAPI** and **SQLAlchemy** with **PostgreSQL**.

### Requirements
* fastapi
* uvicorn
* sqlalchemy
* psycopg2-binary
* pydantic

## Quickstart

1. Install dependencies:

   ```bash
   python3 -m pip install -r requirements.txt
   ```

2. Start FastAPI server

   ```bash
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. Start React dev server

   ```bash
   cd frontend
   npm install
   npm start
   ```

## Features
* Survey creation: create and store surveys with custom questions and descriptions.
* Dynamic survey creation: AI-Powered surveys using Gemini with randomized question types and unique UUIDs.
* Persistent storage: stores surveys in PostgreSQL using SQLAlchemy ORM.
* CORS allows cross-origin requests from frontend apps.

### FastAPI over Flask
* **FastAPI backend over Flask** as it provides a REST API with request data validation via Pydantic. 
* FastAPI also natively supports async endpoints for high-performance requests, making it ideal for AI-based survey generation.