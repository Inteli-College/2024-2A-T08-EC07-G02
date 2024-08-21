import uvicorn
from fastapi import FastAPI, Request, Form
from fastapi.middleware.cors import CORSMiddleware
import json


lista = []

app = FastAPI()

app.add_middleware ( 
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"]

)



@app.get('/')
def index():
    return 'Hello, World'


@app.get('/resultados')
async def resultados():
    return 'Hello, Resultados'

@app.get('/recebe-dados/')
async def recebe_dados(request: Request):
    params = dict(request.query_params)
    
    # Caminho para o arquivo JSON
    arquivo_json = 'dados.json'

    # Tenta abrir o arquivo .json existente e carregar os dados
    try:
        with open(arquivo_json, 'r') as arquivo:
            dados = json.load(arquivo)
    except (FileNotFoundError, json.JSONDecodeError):
        # Se o arquivo não existir ou não for um JSON válido, inicializa uma lista vazia
        dados = []

    # Adiciona os novos dados à lista existente
    dados.append(params)

    # Salva os dados atualizados no arquivo .json
    with open(arquivo_json, 'w') as arquivo:
        json.dump(dados, arquivo, indent=4)

    return params


@app.get('/apresenta-dados')
async def resultados(item1: str = Form(...), item2: str = Form(...)):
    return {'item1': item1, 'item2': item2}


if __name__ == '__main__':
    uvicorn.run(app, port=8000)
 