import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import base64

class ChartService:
    
    @staticmethod
    def grafico_checkup_time():
        try:
            file_path = '../model/MERGE_Final.csv'
            df = pd.read_csv(file_path)
            delta_columns = [col for col in df.columns if col.startswith(('delta_ZP5', 'delta_ZP5A', 'delta_ZP6', 'delta_CABINES'))]
            df['total_checkup_time'] = df[delta_columns].sum(axis=1)
            df_sample = df.sample(20)

            plt.figure(figsize=(12, 6))
            plt.bar(df_sample['KNR'], df_sample['total_checkup_time'])
            plt.title('Tempo Total de Check-up por Carro (Amostra de 20 Carros)')
            plt.xlabel('KNR (Identificação do Carro)')
            plt.ylabel('Tempo Total de Check-up')
            plt.xticks(rotation=45, fontsize=8)
            
            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            image_base64 = base64.b64encode(buf.read()).decode('utf-8')
            plt.close()

            return image_base64
        
        except FileNotFoundError:
            return {"error": f"File '{file_path}' not found."}
        except pd.errors.EmptyDataError:
            return {"error": f"The file '{file_path}' is empty."}
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def grafico_freq_erros():
        try:
            file_path = '../model/FALHAS_KNR.csv'
            df_falhas = pd.read_csv(file_path)
            group_counts = df_falhas['S_GROUP_ID'].value_counts()
            threshold = 0.05
            total_counts = group_counts.sum()
            small_groups = group_counts[group_counts < threshold * total_counts]
            group_counts_adjusted = group_counts[~group_counts.isin(small_groups)]
            group_counts_adjusted['Outros'] = small_groups.sum()

            plt.figure(figsize=(8, 8))
            group_counts_adjusted.plot(kind='pie', autopct='%1.1f%%', startangle=90, colors=plt.cm.Paired(range(len(group_counts_adjusted))))
            plt.title('Grupo de Falhas Mais Recorrentes')
            
            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            image_base64 = base64.b64encode(buf.read()).decode('utf-8')
            plt.close()

            return image_base64
        
        except FileNotFoundError:
            return {"error": f"File '{file_path}' not found."}
        except pd.errors.EmptyDataError:
            return {"error": f"The file '{file_path}' is empty."}
        except Exception as e:
            return {"error": str(e)}
