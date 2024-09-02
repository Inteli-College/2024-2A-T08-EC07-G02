import os
import sys
import onnxruntime as rt
from repositories import DataLake
import numpy as np


class ModelService:
    def __init__(self, model_path, base_dataset):
        self.__datalake = DataLake("datalake.duckdb")
        parquet = self.__datalake.load_parquet(base_dataset)
        print(f"Loaded Parquet DataFrame: {parquet.shape}")
        self.__datalake.save(parquet, "dataset")

        self.__session = rt.InferenceSession(
            model_path, providers=["CPUExecutionProvider"]
        )
        print(
            f"Loaded model from {model_path}, using {len(self.__session.get_inputs())} inputs and {len(self.__session.get_outputs())} outputs"
        )

    def predict(self, KNR):
        row = self.__datalake.query_df(f"SELECT * FROM dataset WHERE KNR = '{KNR}'")
        if row.empty:
            print(f"KNR {KNR} not found in the dataset")
            return None
        excluded_columns = ["KNR", "HAS_FAILURE"]
        print(f"Predicting for KNR {KNR}")
        for col in excluded_columns:
            if col in row.columns:
                row = row.drop(col, axis=1)
        input_data = row.to_numpy().astype(np.float32)
        input_name = self.__session.get_inputs()[0].name
        output_name = self.__session.get_outputs()[0].name
        result = self.__session.run([output_name], {input_name: input_data})[0]
        return result[0].item()

    def new_knr(self, row):
        if not isinstance(row, dict) or not all(
            isinstance(value, list) for value in row.values()
        ):
            row = {k: [v] for k, v in row.items()}
        df = self.__datalake.load_dict(row)
        print(df.head())
        self.__datalake.append(df, "dataset")
        return df

    def get_list(self) -> list[str]:
        result = self.__datalake.query_list("SELECT KNR FROM dataset")
        return [item[0] for item in result]

    def get_knr(self, KNR):
        return self.__datalake.query_df(f"SELECT * FROM dataset WHERE KNR = '{KNR}'")


class ModelServiceSingleton:
    __instance = None

    @staticmethod
    def get_instance() -> ModelService:
        if ModelServiceSingleton.__instance is None:
            ModelServiceSingleton()
        return ModelServiceSingleton.__instance

    def __init__(self):
        if ModelServiceSingleton.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            print("Creating ModelService instance")
            ModelServiceSingleton.__instance = ModelService(
                "./model.onnx", "./PIVOT_d2.parquet"
            )


if __name__ == "__main__":
    import random, json

    ms = ModelServiceSingleton.get_instance()

    KNR = "2023-4536376"
    result = ms.predict(KNR)
    print(f"Prediction for KNR {KNR}: {result}")

    list_knr = ms.get_list()
    print(f"Len of list KNRs: {len(list_knr)}")

    KNR = random.choice(list_knr)
    row = ms.get_knr(KNR)
    row = row.drop("HAS_FAILURE", axis=1)
    row = row.to_json(orient="records", indent=4)
    row = json.loads(row)[0]
    row = json.dumps(row, indent=4)
    with open("row.json", "w") as f:
        f.write(row)
