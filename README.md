# AI HR Analytics Dashboard

An academic, beginner-friendly AI-powered HR analytics system that analyzes employee records, predicts attrition risk, clusters employees by performance, and supports CRUD employee management with backend persistence. The project uses a Next.js frontend (App Router) and a FastAPI backend with explainable ML models and a genetic algorithm for salary optimization.

**Project goals**
- Provide real-time prediction APIs for attrition and cluster assignment.
- Support full employee CRUD operations through the frontend and Excel-backed backend.
- Visualize workforce insights using charts and a clean card-based UI.
- Offer salary-adjustment recommendations using a genetic algorithm informed by model signals.

**Current progress**
- Employee CRUD: add, edit, and delete employees from the `/employees` page.
- Backend: Excel-backed persistence with FastAPI routes for GET, POST, PUT, DELETE.
- Salary optimization: genetic algorithm-based recommendation engine powered by ML model signals.

**Tech Stack**
- Frontend: Next.js (App Router), Tailwind CSS, Recharts
- Backend: Python, FastAPI
- ML: scikit-learn (Naive Bayes, KMeans), StandardScaler
- Data store: Excel workbook (`db.xlsx`) used as a simple database

**Key Features**
- Employee Management: view, add, edit, and delete employees through a card-based UI backed by an Excel workbook.
- Attrition Prediction: Naive Bayes classifier that outputs `Yes` / `No` for leaving.
- Employee Clustering: KMeans clusters labeled `Needs Attention`, `Core Workforce`, and `Top Talent`.
- Salary Optimization: genetic algorithm generates optimized recommendations using model signals and business constraints.
- Analytics Dashboard: Recharts visualizations for attrition, clusters, and salary-performance trends.

Getting started
---------------

Prerequisites
- Node.js 18+ (frontend)
- Python 3.10+ (backend)
- Recommended packages: `fastapi`, `uvicorn`, `pandas`, `scikit-learn`, `joblib`, `openpyxl`

Install frontend

```bash
cd frontend
npm install
```

Run frontend (default: http://localhost:3000)

```bash
npm run dev
```

Install backend and run

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Train ML models

```powershell
cd backend
python train_models.py
```

Place Excel data
- Put your workbook at `backend/data/db.xlsx`. The project includes `backend/data/training_data.csv` for training and a synthetic/IBM-compatible schema.

Project structure
-----------------

Top-level layout (important folders):

```
backend/
	app.py
	train_models.py
	prepare_dataset.py
	data/
		db.xlsx
		training_data.csv
	models/
	routes/
		ai.py
		analytics.py
		employees.py
		salary.py
	services/
		excel_service.py
		attrition_service.py
		clustering_service.py
		salary_service.py

frontend/
	package.json
	src/
		app/
			dashboard/page.js
			employees/page.js
			analytics/page.js
			salary-optimization/page.js
		components/
		lib/api.js

README.md
```

API Endpoints
-------------
All endpoints are served by the FastAPI backend (default port `8000`). Main endpoints:

- `POST /predict-attrition` — Predict attrition for a single employee payload. Returns `{"prediction": "Yes"|"No", "probability": 0.0}`.
- `POST /predict-cluster` — Assigns a cluster id/name for a single record. Returns `{ "cluster": "Needs Attention"|"Core Workforce"|"Top Talent" }`.
- `GET /employees` — Returns the list of employees read from `backend/data/db.xlsx` (optionally enriched with predictions).
- `GET /analytics` — Aggregated analytics (attrition counts, cluster distribution, salary statistics) for dashboard charts.
- `POST /salary-optimization` — Given an employee or selection, returns suggested salary adjustments and rationale using a genetic algorithm search.

See the route implementations in `backend/routes/` for request/response shapes.

ML Models (explanation)
-----------------------
- Attrition: a Naive Bayes classifier trained on `training_data.csv`. Input features include `salary`, `experience`, `satisfaction`, `overtime_hours`, `performance_score`, `tenure_years`. Output is binary `Yes` / `No`.
- Clustering: KMeans run on scaled numeric features (StandardScaler). Clusters are post-labeled by business meaning:
	- Cluster 0 → Needs Attention
	- Cluster 1 → Core Workforce
	- Cluster 2 → Top Talent
- Models and scaler artifacts are saved with `joblib` under `backend/models/` for quick loading by the API.
- Rationale: scikit-learn models are simple, interpretable, and fast — ideal for an academic/demo project.

Data format
-----------
The project expects HR data with columns similar to the IBM HR dataset and the included synthetic data. Example columns:

- `salary` (numeric)
- `experience` (years)
- `satisfaction` (0.0-1.0)
- `overtime_hours` (numeric)
- `performance_score` (numeric)
- `tenure_years` (numeric)
- `attrition_status` (target for training)

Why Excel?
- For this project we intentionally use an Excel workbook (`db.xlsx`) as a simple, file-backed datastore to keep the stack lightweight and easy to inspect for beginners.

How to retrain models
---------------------
1. Update or replace `backend/data/training_data.csv` with your data following the column schema.
2. Run:

```powershell
cd backend
python train_models.py
```

This generates `backend/models/naive_bayes.pkl`, `backend/models/kmeans.pkl`, and the scaler artifact used by clustering.

Frontend notes
--------------
- App routes available at:
	- `/dashboard`
	- `/employees`
	- `/analytics`
	- `/salary-optimization`
- UI is card-first (employee cards) rather than tables; charts use Recharts in `frontend/src/components/charts`.
- API client is `frontend/src/lib/api.js` — set `NEXT_PUBLIC_API_URL` to point at the backend when needed.

Future improvements
-------------------
- Add authentication & role-based access control.
- Replace Excel with a lightweight database (SQLite/Postgres) for concurrency.
- Add uncertainty calibration and explainability (SHAP/LIME) for attrition predictions.
- Offer batch prediction and scheduled retraining pipelines.
- Improve salary optimization with constrained optimization techniques.

Troubleshooting & tips
----------------------
- Feature mismatch errors: re-run `train_models.py` and ensure the frontend/backend agree on feature order.
- CORS errors: verify `allow_origins` in `backend/app.py` includes the frontend origin.
- If models fail to load, confirm `joblib` artifacts exist under `backend/models/` after training.

License & attribution
---------------------
This repository is an academic/demo project. Credit for the dataset format goes to the public IBM HR dataset used as a template for synthetic records.

Questions or next steps
----------------------
If you want, I can:
- Add a quick `requirements.txt` for the backend and a `start` script.
- Add sample `curl` requests for each API endpoint.
- Wire environment variables for easy local development.

Enjoy exploring and extending the AI HR Analytics Dashboard System.
