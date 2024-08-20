import uvicorn
from fastapi import FastAPI, Request

app = FastAPI()

@app.get('/')
def index():
    return 'Hello, World'


if __name__ == '__main__':
    uvicorn.run(app, port=8000)
 