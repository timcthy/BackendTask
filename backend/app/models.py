from sqlalchemy import Column, Integer, String, JSON
from .database import Base

# Stores surveys in the database using SQLAlchemy
class Survey(Base):
    # table name
    __tablename__ = "surveys"
    # pk column
    id = Column(Integer, primary_key=True, index=True)
    # survey description
    description = Column(String, unique=True, index=True)
    # questions and answers as JSON
    data = Column(JSON)
