from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class RemittanceFlow(Base):
    __tablename__ = "remittance_flows"

    id = Column(Integer, primary_key=True, index=True)
    fiscal_year = Column(String, nullable=False)
    year_ad = Column(Integer, nullable=False)
    source_country = Column(String, nullable=False)
    amount_usd = Column(Float, nullable=False)
    num_workers = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())