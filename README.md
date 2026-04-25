# Nepal Economic Dashboard

> Tracking remittance inflows, exchange rate, and inflation in Nepal from 2000–2024.

---

## Overview

Nepal Economic Dashboard is a full-stack web application that visualizes three interconnected macroeconomic indicators:

- **Remittance Inflows (USD)** — money sent home by Nepali workers abroad
- **NPR/USD Exchange Rate** — how the Nepali rupee has weakened over time
- **CPI Inflation (%)** — cost of living changes alongside remittance growth
- Includes a **linear regression forecast** predicting remittance inflows for the next 3 years.

---

## Features

- Real World Bank macroeconomic data (2000–2024)
- Remittance inflow line chart
- Dual-axis exchange rate vs inflation chart
- Linear regression forecast (actual vs predicted)
- Light and dark mode toggle
- Fully responsive design

---

## Tech Stack

### Backend
- **FastAPI** — REST API framework
- **PostgreSQL** — relational database
- **SQLAlchemy** — ORM
- **scikit-learn** — linear regression forecasting
- **Uvicorn** — ASGI server

### Frontend
- **React 18** — UI framework
- **Vite** — build tool
- **Recharts** — charts
- **Axios** — HTTP client
- **React Router** — routing

### Data Source
- **World Bank Open Data** — real Nepal macroeconomic indicators

---

## Project Structure

```
nepal-remittance-tracker/
├── backend/
│   ├── main.py               # FastAPI app entry point
│   ├── database.py           # PostgreSQL connection
│   ├── models.py             # SQLAlchemy ORM models
│   ├── schemas.py            # Pydantic schemas
│   ├── seed.py               # CSV → PostgreSQL loader
│   ├── routers/
│   │   ├── economics.py      # /economics/ endpoints
│   │   └── predict.py        # /predict/ endpoint
│   └── ml/
│       └── forecast.py       # Linear regression model
├── frontend/
│   └── src/
│       ├── api/client.js
│       ├── components/
│       └── pages/
├── data/
│   └── nepal_economic_data.csv
└── README.md
```

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/economics/` | All yearly indicators |
| GET | `/economics/latest` | Most recent year |
| GET | `/predict/?years=3` | Remittance forecast |

---

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create `backend/.env`:
```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/remittance_db
```

Create DB and seed data:
```bash
psql -U postgres -c "CREATE DATABASE remittance_db;"
python seed.py
uvicorn main:app --reload
```

API docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:8000
```

Frontend: `http://localhost:5173`

---

## Data Source

All data from **World Bank Open Data**:

- [Remittance received (Nepal)](https://data.worldbank.org/indicator/BX.TRF.PWKR.CD.DT?locations=NP)
- [Exchange rate NPR/USD](https://data.worldbank.org/indicator/PA.NUS.FCRF?locations=NP)
- [Inflation CPI (Nepal)](https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=NP)

---

## Author

Built by [Saurav](https://github.com/saurav856)
