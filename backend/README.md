# Survey Backend

This is a FastAPI-based backend service that provides a survey-generation API. It works with a frontend React application to dynamically create surveys based on user-provided surveys.

### Requirements
* fastapi
* uvicorn
* sqlalchemy
* psycopg2-binary
* pydantic

## Quickstart

1. Install FastAPI and uvicorn:

   ```bash
   python3 -m pip install fastapi uvicorn
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