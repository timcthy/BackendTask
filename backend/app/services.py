from sqlalchemy.orm import Session
from . import models, schemas

def get_survey_by_description(db: Session, description: str):
    return db.query(models.Survey).filter(models.Survey.description == description).first()

def create_survey(db: Session, description: str):
    # Mock survey JSON
    survey_json = {
        "title": description,
        "questions": [
            {"type": "multiple_choice", "text": "How satisfied are you with our service?"},
            {"type": "rating", "text": "Rate your experience"},
            {"type": "open_text", "text": "What can we improve?"}
        ]
    }
    db_survey = models.Survey(description=description, data=survey_json)
    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)
    return db_survey
