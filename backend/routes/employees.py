from fastapi import APIRouter
from services.excel_service import get_all_employees
from services.attrition_service import predict_attrition
from services.clustering_service import assign_cluster
from schemas.employee import Employee

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

def enrich_employee(emp):
    emp["attrition_status"] = predict_attrition(emp)
    emp["cluster"] = assign_cluster(emp)
    return emp


@router.get("/")
def fetch_employees():
    employees = get_all_employees()
    return [enrich_employee(emp) for emp in employees]

@router.post("/")
def create_employee(
    employee: Employee
):
    return add_employee(
        employee.model_dump()
    )