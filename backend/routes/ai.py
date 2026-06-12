from fastapi import APIRouter
from services.attrition_service import predict_attrition
from services.clustering_service import assign_cluster

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/predict-attrition")
def attrition(data: dict):
    return {
        "attrition_status": predict_attrition(data)
    }


@router.post("/predict-cluster")
def cluster(data: dict):
    return {
        "cluster": assign_cluster(data)
    }