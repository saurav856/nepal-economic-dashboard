from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from database import engine, Base
from routers import economics, predict

Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Nepal Economic Dashboard API", debug=False)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://nepal-economic-dashboard.vercel.app"
],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(economics.router)
app.include_router(predict.router)

@app.get("/health")
@limiter.limit("60/minute")
def health(request: Request):
    return {"status": "ok", "message": "Nepal Economic Dashboard API is running"}