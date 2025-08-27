from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"]
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
        "title": f"{desc[:50]} Survey",
        "questions": [
            {
                "id": str(uuid.uuid4()),
                "type": "multipleChoice",
                "text": "How satisfied are you with our service?",
                "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
            },
            {
                "id": str(uuid.uuid4()),
                "type": "scale",
                "text": "Rate your overall experience",
                "options": [str(i) for i in range(1, 11)]
            },
            {
                "id": str(uuid.uuid4()),
                "type": "openQuestion",
                "text": "What can we improve?",
                "options": []
            }
        ]
    }

    # Save to mocked DB
    mocked_db[desc] = survey

    return survey
