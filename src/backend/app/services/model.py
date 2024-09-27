import os
import numpy as np
import pandas as pd
import keras


class ModelService:
    __model = None
    __current_model: str = None
    __base_path = "./temp/"

    @staticmethod
    def _initialize_model():
        if ModelService.__model is None:
            if ModelService.__current_model is None:
                model_env_path = os.getenv("MODEL_PATH")
                if model_env_path is None:
                    raise FileNotFoundError(
                        "MODEL_PATH environment variable not set. Please set it or use update_model_path(new_model_path)."
                    )
                ModelService.__current_model = os.path.join(
                    ModelService.__base_path, model_env_path
                )

            if not os.path.exists(ModelService.__current_model):
                raise FileNotFoundError(
                    f"Model file '{ModelService.__current_model}' not found."
                )

            ModelService.__model = keras.models.load_model(ModelService.__current_model)
            print(f"Loaded Keras model from '{ModelService.__current_model}'.")

    @staticmethod
    def reload_model():
        ModelService.__model = None
        ModelService._initialize_model()

    @staticmethod
    def get_model_path() -> str:
        return ModelService.__current_model

    @staticmethod
    def update_model_path(new_model_path: str):
        if not os.path.exists(new_model_path):
            raise FileNotFoundError(f"Model file '{new_model_path}' not found.")
        ModelService.__current_model = new_model_path
        ModelService.reload_model()

    @staticmethod
    def get_models() -> list:
        return [x for x in os.listdir(ModelService.__base_path) if x.endswith(".keras")]

    @staticmethod
    def get_model(model_id: str) -> str:
        model_path = os.path.join(ModelService.__base_path, model_id)
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file '{model_path}' not found.")
        return model_path

    @staticmethod
    def predict(knr: pd.DataFrame | dict) -> float:
        if ModelService.__model is None:
            ModelService._initialize_model()

        if isinstance(knr, dict):
            knr = pd.DataFrame([knr])

        excluded_columns = ["KNR", "HAS_FAILURE"]
        knr = knr.drop(
            columns=[col for col in excluded_columns if col in knr.columns],
            errors="ignore",
        )

        input_data = knr.to_numpy().astype(np.float32)

        result = ModelService.__model.predict(input_data)

        if result.shape[1] == 1:
            predicted_class = (result > 0.5).astype(int)
            return predicted_class[0][0]
        else:
            predicted_class = np.argmax(result, axis=1)
            return predicted_class[0]

    @staticmethod
    def get_base_path() -> str:
        return ModelService.__base_path


os.makedirs(ModelService.get_base_path(), exist_ok=True)

if __name__ == "__main__":
    import dotenv

    dotenv.load_dotenv()

    knr = pd.read_parquet("PIVOT_d2.parquet").sample(1)

    print(
        f"Testing KNR '{knr['KNR'].values[0]}' expecting predict {knr['HAS_FAILURE'].values[0]}"
    )
    prediction = ModelService.predict(knr)
    print(f"Predicted: {prediction}")
