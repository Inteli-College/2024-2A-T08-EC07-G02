from fastapi import APIRouter, FastAPI, Request, Response, File, UploadFile
from pathlib import Path
import shutil
from services import ModelServiceSingleton

datalake = APIRouter(prefix="/datalake")

UPLOAD_DIRECTORY = "./temp"


@datalake.post("/")
async def insert(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIRECTORY}/{file.filename}"

    Path(UPLOAD_DIRECTORY).mkdir(parents=True, exist_ok=True)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = ModelServiceSingleton.get_instance().insert_datalake(file_location)
    df_info = {"filename": file.filename, "rows": df.shape[0], "columns": df.shape[1]}
    shutil.rmtree(UPLOAD_DIRECTORY)
    return df_info


@datalake.get("/")
async def get_list():
    df_list = ModelServiceSingleton.get_instance().list_datalakes()
    table_names = df_list["name"].tolist()
    return {"tables": table_names}
