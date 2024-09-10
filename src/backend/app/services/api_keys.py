from repositories import APIKeyRepository


class APIKeyService:
    @staticmethod
    async def get_keys() -> dict:
        return {"keys": await APIKeyRepository.find_all()}

    @staticmethod
    async def create_key() -> dict:
        return dict(await APIKeyRepository.create())
