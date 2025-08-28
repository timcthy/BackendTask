from pydantic import BaseModel
from typing import List

class GenerateSurveyRequest(BaseModel):
    description: str

class SurveyQuestion(BaseModel):
    id: str
    type: str
    text: str
    options: List[str] = []

class SurveyResponse(BaseModel):
    title: str
    questions: List[SurveyQuestion]
