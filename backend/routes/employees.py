from fastapi import APIRouter, HTTPException
from services.excel_service import (
    get_all_employees,
    add_employee,
    update_employee,
    delete_employee
)
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
def create_employee(employee: Employee):
    employee_data = employee.model_dump()

    add_employee(employee_data)

    return enrich_employee(employee_data)

@router.put("/{employee_id}")
def edit_employee(
    employee_id: int,
    employee: Employee
):
    employee_data = employee.model_dump()

    result = update_employee(
        employee_id,
        employee_data
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return enrich_employee(result)

@router.delete("/{employee_id}")
def remove_employee(employee_id: int):
    return delete_employee(employee_id)