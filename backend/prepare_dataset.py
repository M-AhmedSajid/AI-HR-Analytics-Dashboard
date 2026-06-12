import pandas as pd

df = pd.read_csv("data/real_training_data.csv")

# Convert overtime
df["OverTime"] = df["OverTime"].map({
    "Yes": 1,
    "No": 0
})

df["PerformanceRating"] = df["PerformanceRating"].map({
    3: 75,
    4: 95
})

df["EnvironmentSatisfaction"] = df["EnvironmentSatisfaction"].map({
    1: 25,
    2: 50,
    3: 75,
    4: 100
})

# Rename columns
df = df.rename(columns={
    "MonthlyIncome": "salary",
    "TotalWorkingYears": "experience",
    "EnvironmentSatisfaction": "satisfaction",
    "OverTime": "overtime_hours",
    "YearsAtCompany": "tenure_years",
    "PerformanceRating": "performance_score",
    "Attrition": "attrition_status"
})

# Keep only columns we need
df = df[
    [
        "salary",
        "experience",
        "satisfaction",
        "overtime_hours",
        "performance_score",
        "tenure_years",
        "attrition_status"
    ]
]

df.dropna(inplace=True)

df.to_csv("data/training_data.csv", index=False)

print(f"Saved {len(df)} rows")