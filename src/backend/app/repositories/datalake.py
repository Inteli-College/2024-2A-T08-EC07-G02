import duckdb
import pandas as pd


class DataLake:
    __conn = None

    def __init__(self, database_name):
        self.__conn = duckdb.connect(database=database_name)

    def load_csv(self, from_file):
        return self.__conn.from_csv_auto(from_file)

    def load_parquet(self, from_file):
        return self.__conn.from_parquet(from_file)

    def load_dict(self, from_dict):
        return pd.DataFrame.from_dict(from_dict)

    def query_df(self, query):
        return self.__conn.execute(query).fetchdf()

    def query_list(self, query):
        return self.__conn.execute(query).fetchall()

    def list_tables(self):
        return self.__conn.execute("SHOW ALL TABLES").fetchdf()

    def save_csv(self, df, to_file):
        self.__conn.register("temp_table", df)
        self.__conn.execute(f"COPY temp_table TO '{to_file}' (FORMAT CSV, HEADER)")

    def save_parquet(self, df, to_file):
        self.register(df, "temp_table")
        self.__conn.execute(f"COPY temp_table TO '{to_file}' (FORMAT PARQUET)")

    def save(self, df, table_name):
        self.__conn.register(table_name, df)

    def append(self, df, table_name):
        df = pd.DataFrame(df)
        current_dataset = self.query_df(f"SELECT * FROM {table_name}")
        self.save(pd.concat([current_dataset, df]), table_name)

    def close(self):
        self.__conn.close()


if __name__ == "__main__":
    import os

    dl = DataLake("datalake.duckdb")

    # Test loading Parquet file
    df_parquet = dl.load_parquet("./PIVOT_d2.parquet").to_df()
    print("Loaded Parquet DataFrame:")
    print(df_parquet.shape)
    print(df_parquet.head())

    # Test loading CSV file
    df_csv = dl.load_csv("./FAILURES.csv").to_df()
    print("\nLoaded CSV DataFrame:")
    print(df_csv.shape)
    print(df_csv.head())

    # Test loading a dictionary
    df_dict = dl.load_dict({"A": [1, 2, 3], "B": [4, 5, 6]})
    print("\nLoaded DataFrame from a dictionary:")
    print(df_dict.to_df())

    # Test saving to CSV
    dl.save_csv(df_parquet, "./output.csv")
    print("\nSaved DataFrame to CSV.")

    # Test saving to Parquet
    dl.save_parquet(df_csv, "./output.parquet")
    print("Saved DataFrame to Parquet.")

    # Test listing tables
    tables = dl.list_tables()
    print("\nList of tables in the database:")
    print(tables)

    # Test executing a simple query
    query_result = dl.query_df("SELECT COUNT(*) FROM df_parquet")
    print("\nResult of a simple query:")
    print(query_result)

    # Test query that returns a list
    query_list_result = dl.query_list("SELECT KNR FROM df_parquet LIMIT 5")
    print("\nResult of a query that returns a list:")
    print(query_list_result)

    files = ["./output.csv", "./output.parquet"]

    for file in files:
        if os.path.exists(file):
            os.remove(file)
            print(f"Deleted temp file:{file}")
        else:
            print(f"temp file: '{file}' does not exist.")
