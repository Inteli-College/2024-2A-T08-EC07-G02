# API
As APIs podem ser pensadas como intermediárias que facilitam a conversa entre diferentes softwares. Elas estabelecem um conjunto de regras e protocolos que determinam como esses sistemas devem se comunicar. Ao utilizar uma API, um software pode solicitar dados ou funcionalidades de outro software, sem a necessidade de conhecer os detalhes da sua implementação interna. Essa abordagem simplifica o desenvolvimento de novas aplicações, reduzindo custos e tempo de desenvolvimento. Além disso, as APIs oferecem flexibilidade para adaptar sistemas a novas necessidades, facilitando a inovação e a integração de diferentes tecnologias. [1]

Nesse sentido, nessa segunda Sprint foi implementa as rotas: 

`@api_keys_router.get("/api/keys")`: rota responsável por pegar os dados enviados pelo campus dos fomulários.

`@api_keys_router.post("/api/keys")`:Rota responsável por capturar os dados fornecidos no formulário e enviar o KNR obtido para o banco de dados.

`@api_keys_router.get("/health")`: rota responsável por validar os status do recebimento ou postagem da informação do sistema.

Além dessas definições das rotas acima, elas podem ser melhor visualizadas na proórpria docuemntação do FastAPI: `localhost:3333/docs` 


# Bibliografia:

[1] O que é API? Guia de APIs para iniciantes. Redhat.com. Disponível em: <[https://www.redhat.com/pt-br/topics/api/what-are-application-programming-interfaces](https://www.redhat.com/pt-br/topics/api/what-are-application-programming-interfaces)>. Acesso em: 20 ago. 2    024.

‌

‌