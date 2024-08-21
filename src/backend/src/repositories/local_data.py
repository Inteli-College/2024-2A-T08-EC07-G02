import json


class LocalDataRepository:
    @staticmethod
    def load_data(filepath: str) -> dict:
        try:
            with open(filepath, "r") as file:
                return json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}

    @staticmethod
    def save_data(filepath: str, data: dict) -> None:
        with open(filepath, "w") as file:
            json.dump(data, file, indent=4)
