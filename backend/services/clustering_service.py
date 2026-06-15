from services.model_loader import (
    kmeans_model,
    kmeans_scaler,
    cluster_mapping
)

import pandas as pd


def assign_cluster(data):
    features = pd.DataFrame([{
    "salary": data["salary"],
    "satisfaction": data["satisfaction"],
    "experience": data.get("experience", 0),
    "tenure_years": data.get("tenure_years", 0)
}])

    scaled = kmeans_scaler.transform(features)

    cluster_id = kmeans_model.predict(scaled)[0]

    return cluster_mapping.get(cluster_id, "Unknown")