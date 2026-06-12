import pandas as pd
import joblib

from sklearn.naive_bayes import GaussianNB
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder, StandardScaler

# -----------------------------
# LOAD DATA
# -----------------------------

df = pd.read_csv("data/training_data.csv")

# -----------------------------
# ATTRITION MODEL (Naive Bayes)
# -----------------------------

X_attrition = df[
    [
        "salary",
        "experience",
        "satisfaction",
        "overtime_hours",
        "performance_score",
        "tenure_years"
    ]
]

y_attrition = df["attrition_status"]

attrition_encoder = LabelEncoder()
y_attrition_encoded = attrition_encoder.fit_transform(y_attrition)

nb_model = GaussianNB()
nb_model.fit(X_attrition, y_attrition_encoded)

joblib.dump(
    {
        "model": nb_model,
        "encoder": attrition_encoder
    },
    "models/naive_bayes.pkl"
)

# -----------------------------
# CLUSTER MODEL (K-MEANS + SCALING)
# -----------------------------

X_cluster = df[
    [
        "salary",
        "satisfaction",
        "experience",
        "tenure_years"
    ]
]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_cluster)

kmeans_model = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)

kmeans_model.fit(X_scaled)

# -----------------------------
# CLUSTER INTERPRETATION LOGIC
# -----------------------------

df_cluster = X_cluster.copy()
df_cluster["cluster"] = kmeans_model.labels_

# Better scoring system (balanced HR logic)
df_cluster["score"] = (
    df_cluster["salary"] * 0.00001 +
    df_cluster["satisfaction"] * 40 +
    df_cluster["experience"] * 3 +
    df_cluster["tenure_years"] * 2
)

cluster_scores = (
    df_cluster
    .groupby("cluster")["score"]
    .mean()
    .sort_values()
)

cluster_mapping = {
    cluster_scores.index[0]: "Core Workforce",
    cluster_scores.index[1]: "Needs Attention",
    cluster_scores.index[2]: "Top Talent"
}

# -----------------------------
# SAVE MODELS
# -----------------------------

joblib.dump(
    {
        "model": kmeans_model,
        "scaler": scaler,
        "mapping": cluster_mapping
    },
    "models/kmeans.pkl"
)

# -----------------------------
# DEBUG OUTPUT
# -----------------------------

print("Models trained successfully!\n")

print("Cluster Mapping:")
print(cluster_mapping)

print("\nCluster Averages:")
print(
    df_cluster.groupby("cluster")[
        ["salary", "satisfaction", "experience", "tenure_years"]
    ].mean()
)

print("\nAttrition Distribution:")
print(df["attrition_status"].value_counts())