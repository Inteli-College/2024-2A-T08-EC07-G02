from repositories import LocalDataRepository


class DataService:
    FILEPATH = "data.json"

    @staticmethod
    def get_data() -> dict:
        return LocalDataRepository.load_data(DataService.FILEPATH)

    @staticmethod
    def save_data(data: dict) -> None:
        LocalDataRepository.save_data(DataService.FILEPATH, data)
