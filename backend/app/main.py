from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .schemas import GenerateSurveyRequest, SurveyResponse
from .database import get_db
from .services import save_survey, get_survey_by_description
import uuid, json, os

from google import genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Initializes the Google Gemini GenAI client
client = genai.Client()
# Initializes FastAPI app
app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:3000",
]

# Allows permissions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock in-memory storage
mocked_db = {}

# Uses prompt to create randomize JSON data that fits the app structure
@app.post("/api/surveys/generate", response_model=SurveyResponse)
def generate_survey(request: GenerateSurveyRequest, db: Session = Depends(get_db)):
    desc = request.description.strip()

    prompt = """
        Generate a survey JSON object based on the following rules:

        Requirements:

        1. Generate a random survey title. The survey must have at least 3 questions.
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

    # Generates survey content using Gemini
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents = prompt
    )

    # Cleans the AI response to remove any markdown-style code blocks
    clean_text = response.text.strip()
    if clean_text.startswith("```json"):
        clean_text = clean_text[len("```json"):].strip()
    if clean_text.endswith("```"):
        clean_text = clean_text[:-3].strip()

    # Converts the clean string to a python dictionary
    survey = json.loads(clean_text)
    # Saves survey to database
    #save_survey(db, desc, survey)

    return survey
