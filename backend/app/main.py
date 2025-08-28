from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid
import json

from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client()

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

    prompt = """
        Generate a survey JSON object based on the following rules:

        Requirements:

        1. The survey must have at least 3 questions.
        2. Question types should be randomized from the following:
           - "multipleChoice": a question with a list of text options. Must include an "options" array with at least 2 items.
           - "singleChoice": a question with a list of text options. Must include an "options" array with at least 2 items.
           - "openQuestion": a long-answer question. "options" should be an empty array.
           - "shortAnswer": a short-answer question. "options" should be an empty array.
           - "scale": a rating question from 1 to 10. "options" should be an array of strings "1" through "10".
           - "npsScore": a Net Promoter Score question from 0 to 10. "options" should be an array of strings "0" through "10".

        3. Every question must have a unique id in UUID format.

        4. The output JSON structure should be exactly like this:

        {
          "title": "<survey title>",
          "questions": [
              {
                  "id": "<unique UUID>",
                  "type": "<question type>",
                  "text": "<question text>",
                  "options": ["<option1>", "<option2>", ...]
              }
          ]
        }

        5. Randomize both the question types and the question texts/options for each generated survey.

        Generate only the JSON object but make it a string, no extra explanation.
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents = prompt
    )

    clean_text = response.text.strip()
    if clean_text.startswith("```json"):
        clean_text = clean_text[len("```json"):].strip()
    if clean_text.endswith("```"):
        clean_text = clean_text[:-3].strip()



    survey = json.loads(clean_text)
    mocked_db[desc] = survey

    return survey
