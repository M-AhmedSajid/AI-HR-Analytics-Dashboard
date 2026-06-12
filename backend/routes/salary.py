from fastapi import APIRouter
from services.excel_service import get_all_employees
from services.salary_service import get_salary_recommendations

router = APIRouter(prefix="/salary", tags=["Salary"])


@router.get("/recommendations")
def salary_recommendations():
    employees = get_all_employees()

    best_plan = get_salary_recommendations(employees)

    result = []

    for i, emp in enumerate(employees):
        adjustment = best_plan[i]

        recommended_salary = emp["salary"] * (1 + adjustment)

        result.append({
            "id": emp["id"],
            "name": emp["name"],
            "current_salary": emp["salary"],
            "adjustment_percent": round(adjustment * 100, 2),
            "recommended_salary": round(recommended_salary, 2)
        })

    return result