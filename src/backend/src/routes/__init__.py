from .data import data_router
from fastapi import FastAPI


def setup(app: FastAPI):
    app.include_router(data_router)
