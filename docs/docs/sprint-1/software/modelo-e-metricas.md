# Datasets, Modelos e Métricas

Este documento tem como objetivo apresentar os datasets utilizados, os modelos selecionados nesta sprint e as métricas utilizadas para avaliação dos modelos.

## Datasets
Atualmente o projeto conta com quatro datasets com dados diferentes dados de diferentes fontes. Os datasets são:
- Conjunto de dados de `FALHAS`, no qual contém informações sobre falhas em veículos, como o modelo, cor, motor, estação, local, falha e data da falha.
- Relatório de `STATUS`, no qual contém informações sobre o status de veículos, como o KNR, data e status. A coluna de status possui informações sobre a localização da carroceria, ou seja, ela é automaticamente mapeada pelos sensores de trilhos durante no processo de produção.
- Conjunto de relatórios de `RESULTADOS`, no qual contém informações sobre os resultados de máquinas, como o KNR, nome, ID, status, unidade, valor ID, valor e data. Os dados de resultados são divididos em três grupos: máquinas, parafusamento e eletrônicos:
	- Máquinas: resultados de fluidos, regulagem de freio e teste de pedal, indexados pelo ID `1`.
	- Parafusamento: torques e ângulos dos apertos realizados, indexados pelo ID `2`.
	- Eletrônicos: testes de componentes elétricos e eletrônicos, indexados pelo ID `718`.

	Indicados pela coluna `ID`.

	No qual resultados com `status` `10` são considerados `OK`(Dentro das medidas) e resultados com status `13` são considerados `NOK`(Fora das medidas).

	As colunas `UNIT`, `VALUE ID` e `VALUE` são utilizadas para identificar o tipo de valor, o sub resultado e o valor resultante daquele aperto, respectivamente, assim é possível identificar o tipo de resultado obtido.
- Tabela de `PREDICT_VW_M7_EC` é uma tabela de testes fornecida pela Volkswagen, que contém informações _compiladas_ de todas as outras tabelas, com intúito de ser utilizada diretamente no treinamento do modelo, pelo o que foi fornecido de informação, essa tabela tem a mesma estrutura que a utilizada em meios de automações em produção de algumas montadoras da Volkswagen. Atualmente essa tabela serve apenas para escopo de exemplo e não é utilizada no treinamento do modelo já que não possui informações suficientes para tal (É composta por apenas 4 meses de dados).

## Modelos

Será utilizado como base para a seleção de modelos de treino a tabela exemplo fornecida `PREDICT_VW_M7_EC`, pois ela fornece uma base de preparação de dados. O foco inicial será na criação de um modelo de classificação binária que preverá se um carro apresentará falhas com base nos dados históricos disponíveis. Especificamente, a coluna `FALHAS_ROD` será utilizada como variável alvo (target), onde o objetivo é prever se haverá ou não falhas no veículo. Como objetivo das próximas sprints, será a criação de um modelo de classificação multiclasse para prever o tipo de falha que um veículo pode apresentar antes do teste de rodagem.

### Overview do Dataset em relação ao Modelo
O dataset fornecido contém diversas colunas que registram informações sobre o veículo, como tempos de montagem, medições de torque, ângulos, números de falhas em diferentes zonas de produção, entre outros. A coluna alvo para a predição binária é `FALHAS_ROD`, que indica se houve (1) ou não (0) falhas relacionadas à rodagem do veículo.

### Modelos de Predição

Para abordar a tarefa de predição binária, os seguintes modelos de aprendizado de máquina são recomendados:

#### Random Forest
- O Random Forest é um modelo de ensemble (conjunto) que combina várias Decision Tree para melhorar a robustez e a precisão da predição, ele funciona agregando os resultados de múltiplas Decision Tree, o que reduz a variância e melhora a generalização do modelo. Tende a ser mais preciso do que uma única árvore de decisão, especialmente em conjuntos de dados complexos e com muitas variáveis, como no caso da tabela de exemplo `PREDICT_VW_M7_EC` que contém cerca de `80` features. Ele também oferece resistência ao overfitting e fornece uma medida da importância das variáveis, o que pode ser útil para identificar quais fatores são mais influentes na previsão de falhas nos veículos antes da rodagem.

#### Gradient Boosting Machines (GBM)
-  O GBM é outro método de ensemble (conjunto) que cria um modelo preditivo forte a partir de modelos preditivos fracos, adicionando Decision Tree em sequência, cada nova árvore corrige os erros cometidos pelas árvores anteriores. Oferece uma alta precisão e é particularmente eficaz em capturar interações complexas entre as variáveis. É ideal para datasets com muitas características e pode fornecer previsões muito precisas, embora a custo de maior complexidade computacional, ou seja, maior tempo de treinamento. Em relação a tabela de exemplo `PREDICT_VW_M7_EC`, o GBM pode ser útil para capturar as relações complexas entre as variáveis que não podem ser identificadas por visualmente em gráficos de dispersão ou correlação.

#### Support Vector Machine (SVM)
-  O SVM é um modelo de classificação que busca encontrar o hiperplano que melhor separa as classes (no caso binário, falhas e não falhas) no espaço de características, é especialmente eficaz em espaços de alta dimensionalidade e pode utilizar diferentes tipos de kernel para capturar relações complexas entre as variáveis. O SVM é útil quando as classes são não-linearmente separáveis. Ele é robusto a outliers e pode fornecer boas predições em conjuntos de dados com muitas variáveis, como é o caso do seu dataset.

### Conclusão
Para um primeiro modelo, a Regressão Logística ou Árvore de Decisão são recomendadas devido à sua simplicidade e facilidade de interpretação. Estes modelos podem servir como uma linha de base para avaliar a complexidade do problema. Em etapas subsequentes, o Random Forest ou Gradient Boosting podem ser explorados para aumentar a precisão da predição. Para problemas onde há muitos preditores e interações complexas, SVM ou Redes Neurais também devem ser considerados.
