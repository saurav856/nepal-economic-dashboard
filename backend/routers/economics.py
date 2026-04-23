from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import EconomicIndicator
from schemas import EconomicIndicatorSchema

router = APIRouter(prefix="/economics", tags=["economics"])

@router.get("/", response_model=List[EconomicIndicatorSchema])
def get_all(db: Session = Depends(get_db)):
    return db.query(EconomicIndicator).order_by(EconomicIndicator.year).all()

@router.get("/latest", response_model=EconomicIndicatorSchema)
def get_latest(db: Session = Depends(get_db)):
    return db.query(EconomicIndicator).order_by(EconomicIndicator.year.desc()).first()