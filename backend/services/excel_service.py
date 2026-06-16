import pandas as pd

EXCEL_FILE = "data/db.xlsx"
SHEET_NAME = "employees"


def get_all_employees():
    df = pd.read_excel(
        EXCEL_FILE,
        sheet_name=SHEET_NAME
    )

    return df.fillna("").to_dict(
        orient="records"
    )

def add_employee(employee):
    df = pd.read_excel(
        EXCEL_FILE,
        sheet_name=SHEET_NAME
    )
    
    new_id = int(df["id"].max()) + 1
    employee["id"] = new_id

    df = pd.concat(
        [df, pd.DataFrame([employee])],
        ignore_index=True
    )

    with pd.ExcelWriter(
        EXCEL_FILE,
        engine="openpyxl",
        mode="w"
    ) as writer:
        df.to_excel(
            writer,
            sheet_name=SHEET_NAME,
            index=False
        )

    return employee

def delete_employee(employee_id):
    df = pd.read_excel(EXCEL_FILE, sheet_name=SHEET_NAME)

    df = df[df["id"] != employee_id]

    df.to_excel(EXCEL_FILE, sheet_name=SHEET_NAME, index=False)

    return {"message": "Employee deleted"}

def update_employee(employee_id, updated_data):
    df = pd.read_excel(EXCEL_FILE, sheet_name=SHEET_NAME, dtype=object)

    index = df[df["id"] == employee_id].index

    if len(index) == 0:
        return None

    idx = index[0]

    for key, value in updated_data.items():
        df.at[idx, key] = value

    df.to_excel(EXCEL_FILE, sheet_name=SHEET_NAME, index=False)

    return updated_data