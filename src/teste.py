from pymongo import MongoClient

# Substitua '<password>' pela sua senha real
connection_string = "mongodb+srv://eduardosantos:<VrCV4Brl0sfTbeit>@dados.wlfhx.mongodb.net/?retryWrites=true&w=majority&appName=Dados"

client = MongoClient(connection_string)

# Seleciona o banco de dados 'Dados'
db_connection = client['Dados']

# Seleciona a coleção onde os dados serão inseridos
collection = db_connection['sample_mfix']

# Documento a ser inserido
documento = {"nome": "João", "idade": 25, "cidade": "São Paulo"}

# Inserir o documento na coleção
collection.insert_one(documento)

# Confirmação da inserção
print("Documento inserido com sucesso!")
