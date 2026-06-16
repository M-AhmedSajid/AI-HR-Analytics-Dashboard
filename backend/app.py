from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routes.employees import router as employee_router
from routes.ai import router as ai_router
from routes.salary import router as salary_router

app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request, call_next):
    # Force requests to look like HTTPS to avoid internal mixed-content routing redirects
    if request.headers.get("x-forwarded-proto") == "https":
        request.scope["scheme"] = "https"
    response = await call_next(request)
    return response

# CORS setup
load_dotenv()

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router)
app.include_router(ai_router)
app.include_router(salary_router)


@app.get("/")
def root():
    return {"message": "HR Analytics API Running"}