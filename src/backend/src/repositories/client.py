import asyncio
from prisma import Prisma


class PrismaClient(object):
    def __init__(self) -> None:
        self.prisma = Prisma()

    async def __aenter__(self) -> Prisma:
        await self.prisma.connect()
        return self.prisma

    async def __aexit__(self, *args) -> None:
        await self.prisma.disconnect()


if __name__ == "__main__":

    async def main():
        async with PrismaClient() as client:
            print(client)

    asyncio.run(main())
