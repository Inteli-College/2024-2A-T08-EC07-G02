from services import ModelService
from fastapi import APIRouter, FastAPI, Request, Response
from pydantic import BaseModel


class RequestPredict(BaseModel):
    KNR: str


class NewKNR(BaseModel):
    new_row: object


predict_router = APIRouter()


@api_keys_router.get("/api/knr/predict")
async def predict(request: Request, response: Response, data: RequestPredict):
    model_service = ModelService()
    prediction = model_service.predict(data.KNR)
    return {"prediction": prediction}


@api_keys_router.post("/api/knr/new")
async def new_knr(request: Request, response: Response, data: NewKNR):
    model_service = ModelService()
    model_service.new_knr(data.new_row)
    return {"status": "success"}
