from services.model_loader import nb_model, nb_encoder
import numpy as np


def predict_attrition(data):
    features = np.array([[
        data["salary"],
        data["experience"],
        data["satisfaction"],
        data["overtime_hours"],
        data["performance_score"],
        data["tenure_years"]
    ]])

    prediction = nb_model.predict(features)[0]

    return nb_encoder.inverse_transform([prediction])[0]