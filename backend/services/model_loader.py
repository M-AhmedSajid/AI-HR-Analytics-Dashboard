import joblib

# Load Naive Bayes model package
nb_package = joblib.load("models/naive_bayes.pkl")
nb_model = nb_package["model"]
nb_encoder = nb_package["encoder"]

# Load KMeans model
kmeans_package = joblib.load("models/kmeans.pkl")

kmeans_model = kmeans_package["model"]
kmeans_scaler = kmeans_package["scaler"]
cluster_mapping = kmeans_package["mapping"]