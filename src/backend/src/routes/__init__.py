from .data import data_router
from .health_check import health_router
from fastapi import FastAPI


def setup(app: FastAPI):
    app.include_router(data_router)
    app.include_router(health_router)
