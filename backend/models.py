from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class EconomicIndicator(Base):
    __tablename__ = "economic_indicators"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer, nullable=False, unique=True)
    remittance_usd = Column(Float, nullable=True)
    exchange_rate_npr_usd = Column(Float, nullable=True)
    inflation_pct = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())