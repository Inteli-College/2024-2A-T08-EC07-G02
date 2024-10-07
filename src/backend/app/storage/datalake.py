import duckdb
import pandas as pd
import os


class Datalake:
    def __init__(self) -> None:
        self.database_url = os.getenv("DATALAKE_URL")
        self.__duckdb = None

        # Set up AWS S3 credentials
        self.s3_key_id = os.getenv("AWS_ACCESS_KEY_ID")
        self.s3_secret = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.s3_region = os.getenv("AWS_SESSION_TOKEN")

        # Configure DuckDB to connect to S3
        self.configure_s3()

    @property
    def duckdb(self) -> duckdb.DuckDBPyConnection:
        return self.__duckdb

    def __enter__(self):
        if self.__duckdb is None:
            self.__duckdb = duckdb.connect()
            self.__duckdb.sql(f"""
                SET s3_region='{self.s3_region}';
                SET s3_access_key_id='{self.s3_key_id}';
                SET s3_secret_access_key='{self.s3_secret}';
            """)
        return self.duckdb

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.__duckdb:
            self.__duckdb.close()
            self.__duckdb = None


if __name__ == "__main__":
    import dotenv
    dotenv.load_dotenv()   
    table_name = 'testegd'
    data = {'col_1': [3, 2, 1, 0], 'col_2': ['a', 'b', 'c', 'd']}
    df = pd.DataFrame.from_dict(data)
    with Datalake() as client:
        client.execute(f"INSERT INTO {table_name} SELECT * FROM df", {"df": df})
        print(f"Data inserted into table '{table_name}' successfully.")
        print(1)

