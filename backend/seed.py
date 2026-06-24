import csv
import os
from database import engine, Base, SessionLocal
from models import EconomicIndicator

def seed():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    existing = db.query(EconomicIndicator).first()
    if existing:
        print("Already seeded. Skipping.")
        db.close()
        return

    csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "nepal_economic_data.csv")

    with open(csv_path, newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Loading {len(rows)} records...")

    for row in rows:
        def to_float(val):
            try:
                return float(val) if val else None
            except (ValueError, TypeError):
                return None

        record = EconomicIndicator(
            year=int(row["year"]),
            remittance_usd=to_float(row["remittance_usd"]),
            exchange_rate_npr_usd=to_float(row["exchange_rate_npr_usd"]),
            inflation_pct=to_float(row["inflation_pct"]),
        )
        db.add(record)

    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed()