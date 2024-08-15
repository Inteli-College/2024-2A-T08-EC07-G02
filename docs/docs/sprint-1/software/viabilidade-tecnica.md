# Estudo de Viabilidade Técnica

O estudo de viabilidade técnica proporciona uma análise geral que além de determinar se o projeto é tecnicamente viável, avalia as tecnologias envolvidas e procura determinar possíveis desafios que podem surgir ao longo do desenvolvimento. Esse estudo ajuda a garantir de que o projeto poderá ser entregue e cumpra o escopo definido com qualidade. 

## Tecnologias e Ferramentas 
### Modelos de Aprendizado de Máquina
SVM e Gradiente
### Python
Pandas, NumPy e Matploytlib

## Dados
### Disponibilidade de Dados
### Estudo dos Dados

Para a tabela *FALHAS*, a primeira etapa foi a leitura da base de dados, onde a tabela foi carregada em um DataFrame para análise. Em seguida, realizou-se uma visualização da estrutura do DataFrame, identificando sua forma (número de linhas e colunas) e as colunas disponíveis, permintindo a maior compreensão dos dados em questão. Foram identificados os tipos de dados presentes em cada coluna para garantir que todas as variáveis estavam no formato correto para a análise. Ao analisar os dados, verificou-se a quantidade de valores nulos em cada coluna e optou-se pela exclusão dos registros com dados faltantes, resultando na remoção de 1862 registros da tabela, o que melhorou a integridade dos dados para o processo de modelagem.

O próximo passo foi filtrar a tabela para focar apenas nos modelos de veículos T-Cross, que são o modelo de interesse. Isso envolveu a identificação de todas as ocorrências desse modelo e a exclusão de dados relativos a outros modelos. Além disso, eliminou-se colunas que não eram relevantes para a análise, como a coluna Modelo (tendo em vista que nesse momento todos os registros se referiam ao T-Cross) e a coluna Data, que não era necessária para esse modelo preditivo.Para assegurar a consistência dos dados, as descrições das falhas foram padronizadas, convertendo todos os textos para letras maiúsculas. Após essa padronização, fez-se uma nova visualização para garantir que todas as falhas foram uniformizadas. Em sequência, identificou-se e elimou-se registros duplicados, garantindo que cada falha registrada na base de dados fosse única e representativa.

Já na tabela *RESULTADOS*, o primeiro passo foi a leitura da tabela e identificar a presença de colunas que não tinham utilidade para a essa análise.  As coluna foram removidas. Em seguida, realizou-se uma contagem das ocorrências do KNR em cada coluna, o que ajudou a entender a distribuição e a frequência desse parâmetro nas diferentes categorias de resultados. 

Por fim, após a limpeza e padronização de ambas as tabelas *FALHAS* e *RESULTADOS*, seguiu-se com a combinação dessas duas tabelas. Essa junção foi necessária para integrar as informações de falhas e resultados, permitindo que o modelo preditivo fosse treinado com um conjunto de dados completo, que reflete as falhas identificadas e os resultados observados no processo.



### Normalização

## Custo e Tempo
### Orçamento
### Tempo de Execução

## Risco e Desafios
### Risco 1
### Risco 2



# Bibliografia:
Arrumar
https://medium.com/turing-talks/turing-talks-12-classifica%C3%A7%C3%A3o-por-svm-f4598094a3f1