import duckdb
import pandas as pd
import os


class Datalake:
    def __init__(self) -> None:
        self.database_url = os.getenv("DATALAKE_URL")
        self.__duckdb = None

    @property
    def duckdb(self) -> duckdb.DuckDBPyConnection:
        return self.__duckdb

    def __enter__(self):
        if self.__duckdb is None:
            self.__duckdb = duckdb.connect(database=self.database_url)
        return self.duckdb

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.__duckdb:
            self.__duckdb.close()
            self.__duckdb = None
