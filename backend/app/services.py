from sqlalchemy.orm import Session
from . import models

# Retrieves survey from database by its description
def get_survey_by_description(db: Session, description: str):
    return db.query(models.Survey).filter(models.Survey.description == description).first()

# Saves a new survey in the database
def save_survey(db: Session, description: str, survey_json: dict):
    db_survey = models.Survey(description=description, data=survey_json)
    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)
    return db_survey
