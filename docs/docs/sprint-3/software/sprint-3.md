# Sprint 3

Da Sprint 2 para a Sprint 3, as principais mudanças focaram em otimizar o desenvolvimento e orquestrar o banco de dados.

## Armazenamento com Docker
Na Sprint 3, foi introduzido o uso do Docker para o gerenciamento e deploy do ambiente de desenvolvimento e banco de dados, o que marcou uma evolução significativa em termos de infraestrutura. Com o Docker, o projeto passou a ser containerizado, permitindo maior consistência e facilidade de execução em diferentes ambientes. Essa abordagem não havia sido contemplada nas sprints anteriores. Na Sprint 2, o foco estava em implementar os modelos preditivos e as APIs, sem o uso de contêineres para gerenciar o ambiente.

## Datalake
Foi discutido o conceito de Datalake para armazenamento de dados, uma solução centralizada que permite a ingestão e o armazenamento de dados brutos em grande escala. No entanto, como os dados fornecidos pela empresa já eram refinados e, decidiu-se não implementar um Datalake para esse projeto. Caso fosse necessário trabalhar com dados em seu formato bruto, a implementação de um Datalake teria sido essencial.

## Pipeline com Docker
Nessa sprint, também foi introduzido o arquivo `**docker-compose-db.yml**`, uma configuração essencial para a orquestração de contêineres, especialmente o serviço de banco de dados PostgreSQL. Isso otimizou a criação de um ambiente de desenvolvimento mais eficiente, permitindo o gerenciamento de serviços de forma automatizada e a integração contínua dos componentes do projeto. Essa automação do ambiente com o Docker facilitou a colaboração entre os desenvolvedores e tornou o ambiente de desenvolvimento mais previsível e replicável, algo que não havia sido mencionado nas sprints anteriores.