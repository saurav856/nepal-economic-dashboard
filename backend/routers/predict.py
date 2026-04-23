from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from models import EconomicIndicator
from ml.forecast import predict_remittance

router = APIRouter(prefix="/predict", tags=["predict"])

@router.get("/")
def get_prediction(
    years: int = Query(default=3, ge=1, le=10),
    db: Session = Depends(get_db)
):
    results = db.query(EconomicIndicator).order_by(EconomicIndicator.year).all()

    historical = [
        {"year_ad": r.year, "total_amount_usd": r.remittance_usd}
        for r in results if r.remittance_usd
    ]

    forecast = predict_remittance(historical, years)

    return {
        "historical": historical,
        "forecast": forecast
    }