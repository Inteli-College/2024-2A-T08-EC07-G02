from services import DataService
from fastapi import APIRouter, FastAPI, Request, Response
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    value: str


data_router = APIRouter()


@data_router.get("/data")
def get_data(request: Request) -> dict:
    return DataService.get_data()


@data_router.put("/data")
def save_data(request: Request, response: Response, item: Item) -> dict:
    DataService.save_data(item.dict())
    return DataService.get_data()
