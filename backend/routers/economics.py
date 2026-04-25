from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import EconomicIndicator
from schemas import EconomicIndicatorSchema
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/economics", tags=["economics"])

@router.get("/", response_model=List[EconomicIndicatorSchema])
@limiter.limit("60/minute")
def get_all(request: Request, db: Session = Depends(get_db)):
    return db.query(EconomicIndicator).order_by(EconomicIndicator.year).all()

@router.get("/latest", response_model=EconomicIndicatorSchema)
@limiter.limit("60/minute")
def get_latest(request: Request, db: Session = Depends(get_db)):
    return db.query(EconomicIndicator).order_by(EconomicIndicator.year.desc()).first()