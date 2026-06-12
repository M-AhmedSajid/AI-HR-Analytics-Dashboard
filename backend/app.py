from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.employees import router as employee_router
from routes.ai import router as ai_router
from routes.salary import router as salary_router

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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