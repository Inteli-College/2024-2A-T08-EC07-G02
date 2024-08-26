from .client import PrismaClient
from utils import Generator


class APIKeyRepository:
    async def create() -> dict:
        async with PrismaClient() as client:
            return await client.apikey.create({"key": Generator.generate_api_key()})

    async def find_by_key(key: str) -> dict:
        async with PrismaClient() as client:
            api_key = await client.apikey.find_unique(where={"key": key})
            return api_key

    async def find_all() -> list:
        async with PrismaClient() as client:
            api_keys = await client.apikey.find_many()
            return api_keys

    async def delete(key: str) -> dict:
        async with PrismaClient() as client:
            api_key = await client.apikey.delete(where={"key": key})
            return api_key

    async def delete_all() -> dict:
        async with PrismaClient() as client:
            api_keys = await client.apikey.delete_many()
            return api_keys
