from services.model_loader import (
    kmeans_model,
    kmeans_scaler,
    cluster_mapping
)

import numpy as np


def assign_cluster(data):
    features = np.array([[
        data["salary"],
        data["satisfaction"],
        data.get("experience", 0),
        data.get("tenure_years", 0)
    ]])

    scaled = kmeans_scaler.transform(features)

    cluster_id = kmeans_model.predict(scaled)[0]

    return cluster_mapping.get(cluster_id, "Unknown")