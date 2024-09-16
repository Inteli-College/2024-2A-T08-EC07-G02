from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
import pandas as pd
import os
import io
import logging
from services import DatalakeService

datalake_router = APIRouter(prefix="/datalake")

logger = logging.getLogger(__name__)


@datalake_router.post("/")
async def insert(file: UploadFile = File(...)):
    try:
        content = await file.read()
        file_extension = os.path.splitext(file.filename)[1].lower()

        if file_extension == ".csv":
            df = pd.read_csv(io.BytesIO(content))
            logger.debug(f"CSV file '{file.filename}' read into DataFrame.")
        elif file_extension == ".parquet":
            df = pd.read_parquet(io.BytesIO(content))
            logger.debug(f"Parquet file '{file.filename}' read into DataFrame.")
        else:
            error_msg = "Unsupported file type. Only CSV and Parquet are supported."
            logger.error(error_msg)
            raise HTTPException(status_code=400, detail=error_msg)

        table_name = os.path.splitext(file.filename)[0]
        logger.debug(f"Using table name '{table_name}' for insertion.")

        DatalakeService.create_table(df, table_name)
        logger.info(f"Table '{table_name}' created successfully in the datalake.")

        df_info = {
            "filename": file.filename,
            "rows": df.shape[0],
            "columns": df.shape[1],
        }
        return df_info

    except Exception as e:
        logger.exception("An error occurred while inserting data into the datalake.")
        raise HTTPException(status_code=500, detail=str(e))


@datalake_router.get("/")
async def get_list():
    try:
        tables_df = DatalakeService.list_tables()
        table_names: List[str] = tables_df["name"].tolist()
        logger.debug("Retrieved list of tables from the datalake.")
        return {"tables": table_names}

    except Exception as e:
        logger.exception("An error occurred while retrieving the list of tables.")
        raise HTTPException(status_code=500, detail=str(e))
