from pydantic import BaseModel


class Employee(BaseModel):
    id: int
    name: str
    role: str
    department: str
    salary: float
    experience: int
    satisfaction: float
    overtime_hours: int
    performance_score: int
    attrition_status: str
    cluster: str
    tenure_years: float