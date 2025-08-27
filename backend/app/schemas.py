from pydantic import BaseModel
from typing import List, Dict

class Question(BaseModel):
    type: str
    text: str

class SurveyCreate(BaseModel):
    description: str

class SurveyResponse(BaseModel):
    title: str
    questions: List[Question]
