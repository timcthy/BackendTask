from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Survey(Base):
    __tablename__ = "surveys"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, unique=True, index=True)
    data = Column(JSON)
