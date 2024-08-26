from services import APIKeyService
from fastapi import APIRouter, FastAPI, Request, Response
from pydantic import BaseModel


api_keys_router = APIRouter()


@api_keys_router.get("/api/keys")
async def get_data(request: Request, response: Response) -> dict:
    return await APIKeyService.get_keys()


@api_keys_router.post("/api/keys")
async def create_key(request: Request, response: Response) -> dict:
    return await APIKeyService.create_key()
