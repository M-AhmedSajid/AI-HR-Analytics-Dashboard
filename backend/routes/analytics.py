from fastapi import APIRouter
from services.excel_service import get_all_employees

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/")
def analytics():
    employees = get_all_employees()

    total = len(employees)

    avg_salary = sum(e["salary"] for e in employees) / total
    avg_perf = sum(e["performance_score"] for e in employees) / total

    attrition_yes = sum(
        1 for e in employees if e["attrition_status"] == "Yes"
    )

    attrition_rate = (attrition_yes / total) * 100

    clusters = {
        "High Performer": 0,
        "Medium Performer": 0,
        "Low Performer": 0
    }

    for e in employees:
        cluster = e["cluster"]
        if cluster in clusters:
            clusters[cluster] += 1

    return {
        "total_employees": total,
        "average_salary": round(avg_salary, 2),
        "average_performance": round(avg_perf, 2),
        "attrition_count": attrition_yes,
        "attrition_rate": round(attrition_rate, 2),
        "cluster_distribution": clusters
    }