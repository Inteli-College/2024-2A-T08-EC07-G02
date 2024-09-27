import os
import onnxruntime as rt
import numpy as np
import pandas as pd


class ModelService:
    __session: rt.InferenceSession = None
    __current_model: str = None
    __base_path = "./temp/"

    @staticmethod
    def _initialize_model():
        if ModelService.__session is None:
            if ModelService.__current_model is None:
                ModelService.__current_model = os.path.join(
                    ModelService.__base_path, os.getenv("MODEL_PATH")
                )

            if ModelService.__current_model is None:
                raise FileNotFoundError(
                    "Model file not found in current environment, please set MODEL_PATH in environment or use update_model_path(new_model_path)"
                )

            if not os.path.exists(ModelService.__current_model):
                raise FileNotFoundError(
                    f"Model file '{ModelService.__current_model}' not found"
                )

            model_path = os.path.join(
                ModelService.__base_path, ModelService.__current_model
            )
            ModelService.__session = rt.InferenceSession(
                model_path, providers=["CPUExecutionProvider"]
            )

    @staticmethod
    def reload_model():
        ModelService.__session = None
        ModelService._initialize_model()

    @staticmethod
    def get_model_path() -> str:
        return ModelService.__current_model

    @staticmethod
    def update_model_path(new_model_path: str):
        if not os.path.exists(new_model_path):
            raise FileNotFoundError(f"Model file '{new_model_path}' not found")
        ModelService.__current_model = new_model_path
        ModelService.reload_model()

    @staticmethod
    def get_models() -> list[str]:
        return os.listdir(ModelService.__base_path)

    @staticmethod
    def predict(knr: pd.DataFrame | dict) -> float:
        if ModelService.__session is None:
            ModelService._initialize_model()

        if isinstance(knr, dict):
            knr = pd.DataFrame([knr])

        excluded_columns = ["KNR", "HAS_FAILURE"]
        knr = knr.drop(columns=[col for col in excluded_columns if col in knr.columns])

        input_data = knr.to_numpy().astype(np.float32)
        input_name = ModelService.__session.get_inputs()[0].name
        output_name = ModelService.__session.get_outputs()[0].name

        result = ModelService.__session.run([output_name], {input_name: input_data})[0]
        return result[0].item()

    @staticmethod
    def get_base_path() -> str:
        return ModelService.__base_path


os.makedirs(ModelService.get_base_path(), exist_ok=True)

if __name__ == "__main__":
    import dotenv

    dotenv.load_dotenv()

    knr = pd.read_parquet("PIVOT_d2.parquet").sample(1)
    # knr = pd.read_parquet("PIVOT_d2.parquet").query("HAS_FAILURE == 1").sample(1)
    print(
        f"Testing KNR '{knr['KNR'].values[0]}' expecting predict {knr['HAS_FAILURE'].values[0]}"
    )
    print(f"Predicted: {ModelService.predict(knr)}")
