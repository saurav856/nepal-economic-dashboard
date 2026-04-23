from pydantic import BaseModel
from typing import Optional

class EconomicIndicatorSchema(BaseModel):
    id: int
    year: int
    remittance_usd: Optional[float]
    exchange_rate_npr_usd: Optional[float]
    inflation_pct: Optional[float]

    class Config:
        from_attributes = True

class ForecastSchema(BaseModel):
    year: int
    predicted_remittance_usd: float