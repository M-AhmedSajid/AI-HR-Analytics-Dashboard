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