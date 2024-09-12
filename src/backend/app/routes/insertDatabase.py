from fastapi import APIRouter, FastAPI, Request, Response, File, UploadFile
from pathlib import Path
import shutil

insertDatabse = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIRECTORY = BASE_DIR / "database"


@insertDatabse.post("/insertBase")
async def inserir_base(file: UploadFile = File(...)):
    file_location = UPLOAD_DIRECTORY / file.filename

    # Salvando o arquivo na pasta especificada
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"info": f"Arquivo '{file.filename}' salvo com sucesso em {file_location}"}
