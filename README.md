# AI HR Analytics Dashboard

Modern HR Analytics Dashboard with a Next.js frontend and a FastAPI backend. The backend provides employee data, AI predictions (attrition + clusters), and salary recommendations. The frontend consumes these APIs and renders interactive charts.

**Requirements**
- **Node.js**: for the frontend. Tested with Node 18+.
- **Python 3.10+**: for the backend. Install these Python packages: `fastapi`, `uvicorn`, `pandas`, `scikit-learn`, `joblib`, `openpyxl`.

**Repository layout**
- **Backend**: [backend](backend) — FastAPI app, model training, and services.
- **Frontend**: [frontend](frontend) — Next.js app (App Router) and UI components.

**Quickstart — Backend**
- Create a Python virtual environment and install dependencies (example):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install fastapi uvicorn pandas scikit-learn joblib openpyxl
```

- Prepare dataset (if you have raw HR data) or use the provided CSV in `backend/data`.
- Train models (creates `models/naive_bayes.pkl` and `models/kmeans.pkl`):

```powershell
cd backend
python train_models.py
```

- Run the API server:

```powershell
uvicorn app:app --reload --port 8000
```

Notes:
- The backend reads employees from [backend/data/db.xlsx](backend/data/db.xlsx) via `backend/services/excel_service.py` and exposes endpoints under `/employees`, `/ai`, and `/salary`.
- CORS is configured in [backend/app.py](backend/app.py) to allow `http://localhost:3000` by default.

**Quickstart — Frontend**
- Install dependencies and run dev server:

```powershell
cd frontend
npm install
npm run dev
```

- If your backend runs on a different host/port, set the frontend API base URL before starting:

On Windows PowerShell:
```powershell
$env:NEXT_PUBLIC_API_URL = "http://localhost:8000"
npm run dev
```

**Key files**
- Backend training: [backend/train_models.py](backend/train_models.py)
- Backend routes: [backend/app.py](backend/app.py), [backend/routes/employees.py](backend/routes/employees.py), [backend/routes/ai.py](backend/routes/ai.py), [backend/routes/salary.py](backend/routes/salary.py)
- Frontend API client: [frontend/src/lib/api.js](frontend/src/lib/api.js)
- Frontend pages using real data: [frontend/src/app/dashboard/page.js](frontend/src/app/dashboard/page.js), [frontend/src/app/employees/page.js](frontend/src/app/employees/page.js)

**Available API endpoints**
- `GET /` — health message
- `GET /employees/` — list employees (enriched with attrition and cluster)
- `POST /employees/` — create an employee (expects employee schema)
- `POST /ai/predict-attrition` — predict attrition for a single record
- `POST /ai/predict-cluster` — predict cluster for a single record
- `GET /salary/recommendations` — compute salary recommendations

**Data & models**
- Training CSV: [backend/data/training_data.csv](backend/data/training_data.csv)
- Persistent employee workbook: [backend/data/db.xlsx](backend/data/db.xlsx)
- Trained models are saved to `models/` by `train_models.py`.

**Troubleshooting**
- If you see feature-dimension errors (e.g. StandardScaler expecting a different number of features), re-run `train_models.py` to regenerate the scaler with the expected feature order.
- If frontend shows CORS errors, ensure the backend's `allow_origins` in [backend/app.py](backend/app.py) matches the frontend origin.
