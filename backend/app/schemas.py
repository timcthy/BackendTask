from pydantic import BaseModel
from typing import List

# Schema for the request body when generating a survey
class GenerateSurveyRequest(BaseModel):
    description: str

# Schema for a single survey question
class SurveyQuestion(BaseModel):
    id: str
    type: str
    text: str
    options: List[str] = []

# Schema for the response returned after generating a survey
class SurveyResponse(BaseModel):
    title: str
    questions: List[SurveyQuestion]
