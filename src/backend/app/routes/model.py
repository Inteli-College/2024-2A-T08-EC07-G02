from services import ModelService, KNRService
from fastapi import APIRouter, FastAPI, Request, Response, File, UploadFile
from pydantic import BaseModel
import time
from utils import read_file_param
from pipelines import ModelPipeline

model_router = APIRouter(prefix="/model")


@model_router.post("/train")
async def request(
    failures: UploadFile = File(...),
    results: UploadFile = File(...),
    status: UploadFile = File(...),
):
    try:
        failures_df = await read_file_param(failures)
        results_df = await read_file_param(results)
        status_df = await read_file_param(status)

        pipeline = ModelPipeline(failures_df, results_df, status_df)
        model_path = os.path.join(
            ModelService.get_base_path(), f"model_{time.strftime('%Y%m%d%H%M%S')}.onnx"
        )
        result = pipeline.run(model_path)

        ModelService.update_model_path(model_path)

        return result

    except Exception as e:
        return {"status": "error", "message": str(e)}


@model_router.get("/")
async def list_models():
    model = ModelService.get_models()
    return {"models": model}
