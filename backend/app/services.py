from sqlalchemy.orm import Session
from . import models

# Retrieves survey from database by its title
def get_survey_by_description(db: Session, title: str):
    return db.query(models.Survey).filter(models.Survey.title == description).first()

# Saves a new survey in the database
def save_survey(db: Session, title: str, survey_json: dict):
    db_survey = models.Survey(title=title, data=survey_json)
    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)
    return db_survey
