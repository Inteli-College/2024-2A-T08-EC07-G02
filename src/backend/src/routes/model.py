from services import ModelServiceSingleton
from fastapi import APIRouter, FastAPI, Request, Response
from pydantic import BaseModel


class RequestPredict(BaseModel):
    KNR: str


predict_router = APIRouter()
ModelServiceSingleton.get_instance()


@predict_router.get("/api/knr/predict")
async def predict(request: Request, response: Response, data: RequestPredict):
    prediction = ModelServiceSingleton.get_instance().predict(data.KNR)
    if prediction:
        return {"prediction": {"result": prediction}}
    else:
        return {"prediction": {"result": "KNR not found"}}


@predict_router.get("/api/knr/list")
async def list(request: Request, response: Response):
    list_knr = ModelServiceSingleton.get_instance().get_list()
    return {"list": list_knr}


@predict_router.post("/api/knr/new")
async def new_knr(request: Request, response: Response):
    df = ModelServiceSingleton.get_instance().new_knr(await request.json())
    return {"result": f"New KNR added: {df.to_dict()['KNR'][0]}"}
