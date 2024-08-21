import uvicorn
from fastapi import FastAPI
from app import AppWrapper
from fastapi.middleware.cors import CORSMiddleware
from routes import setup as setup_routes


app_wrapper = AppWrapper()

app_wrapper.get_app().add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["*"],
)

setup_routes(app_wrapper.get_app())

if __name__ == "__main__":
    uvicorn.run(app_wrapper.get_app(), host="0.0.0.0", port=3333)
