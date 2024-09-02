from .api_keys import api_keys_router
from .health_check import health_router
from .model import predict_router
from fastapi import FastAPI


def setup(app: FastAPI):
    app.include_router(health_router)
    app.include_router(api_keys_router)
    app.include_router(predict_router)
