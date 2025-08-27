from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("API_KEY")

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mocked in-memory storage
mocked_db = {}

# Request schema
class GenerateSurveyRequest(BaseModel):
    description: str

# Survey schema
class SurveyQuestion(BaseModel):
    id: str
    type: str
    text: str
    options: List[str] = []

class SurveyResponse(BaseModel):
    title: str
    questions: List[SurveyQuestion]


@app.post("/api/surveys/generate", response_model=SurveyResponse)
def generate_survey(request: GenerateSurveyRequest):
    desc = request.description.strip()

    # generate a mocked survey JSON
    survey = {
                 "title": "Customer Experience Survey",
                 "questions": [
                     {
                         "id": str(uuid.uuid4()),
                         "type": "multipleChoice",
                         "text": "Which of the following products have you used?",
                         "options": ["Product A", "Product B", "Product C", "Product D"]
                     },
                     {
                         "id": str(uuid.uuid4()),
                         "type": "shortAnswer",
                         "text": "What do you like most about our service?",
                         "options": []
                     },
                     {
                         "id": str(uuid.uuid4()),
                         "type": "scale",
                         "text": "Rate your overall satisfaction with our support team",
                         "options": [str(i) for i in range(1, 11)]
                     },
                     {
                         "id": str(uuid.uuid4()),
                         "type": "openQuestion",
                         "text": "Any additional comments or suggestions?",
                         "options": []
                     }
                 ]
             }

    # Save to mocked DB
    mocked_db[desc] = survey

    return survey
