import pandas as pd
from database import engine, Base, SessionLocal
from models import EconomicIndicator
import os

def seed():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    existing = db.query(EconomicIndicator).first()
    if existing:
        print("Already seeded. Skipping.")
        db.close()
        return

    csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "nepal_economic_data.csv")
    df = pd.read_csv(csv_path)

    print(f"Loading {len(df)} records...")

    for _, row in df.iterrows():
        record = EconomicIndicator(
            year=int(row["year"]),
            remittance_usd=float(row["remittance_usd"]) if pd.notna(row["remittance_usd"]) else None,
            exchange_rate_npr_usd=float(row["exchange_rate_npr_usd"]) if pd.notna(row["exchange_rate_npr_usd"]) else None,
            inflation_pct=float(row["inflation_pct"]) if pd.notna(row["inflation_pct"]) else None,
        )
        db.add(record)

    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed()