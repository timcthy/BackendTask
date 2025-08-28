import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Loads environment variables from a .env file into the system environment
load_dotenv()

# Creates a SQLAlchemy engine using the DATABASE_URL from environment variables
engine = create_engine(os.getenv("DATABASE_URL"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal() # Creates a new database session
    try:
        yield db # Provides session to the caller
    finally:
        db.close() # Closes session after use
