import os
import onnxruntime as rt
import numpy as np
import pandas as pd


class ModelService:
    __session: rt.InferenceSession = None

    @staticmethod
    def _initialize_model():
        if ModelService.__session is None:
            model_path = os.path.join("./", os.getenv("MODEL_PATH"))
            ModelService.__session = rt.InferenceSession(
                model_path, providers=["CPUExecutionProvider"]
            )

    @staticmethod
    def predict(knr: pd.DataFrame | dict) -> float:
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


if __name__ == "__main__":
    import dotenv

    dotenv.load_dotenv()

    knr = pd.read_parquet("PIVOT_d2.parquet").sample(1)
    # knr = pd.read_parquet("PIVOT_d2.parquet").query("HAS_FAILURE == 1").sample(1)
    print(
        f"Testing KNR '{knr['KNR'].values[0]}' expecting predict {knr['HAS_FAILURE'].values[0]}"
    )
    print(f"Predicted: {ModelService.predict(knr)}")
