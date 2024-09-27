import os
import pandas as pd


class ModelPipeline:
    __failures: pd.DataFrame
    __results: pd.DataFrame
    __status: pd.DataFrame

    def __init__(
        self, failures: pd.DataFrame, results: pd.DataFrame, status: pd.DataFrame
    ):
        self.__failures = failures
        self.__results = results
        self.__status = status

    def run(self, output_path: str):
        try:
            (self.__failures, self.__results, self.__status) = Transform(self).run()
            Load(self, output_path).run()
        except Exception as e:
            print(e)
            return {"status": "error", "message": str(e)}
        finally:
            return {"status": "success", "message": "Model pipeline completed."}

    @property
    def failures(self):
        return self.__failures

    @property
    def results(self):
        return self.__results

    @property
    def status(self):
        return self.__status


class Transform:
    __model_pipeline: ModelPipeline

    __failures: pd.DataFrame
    __results: pd.DataFrame
    __status: pd.DataFrame

    def __init__(self, model_pipeline: ModelPipeline):
        self.__model_pipeline = model_pipeline

    def __process_failures(self):
        print(self.__model_pipeline.failures.head())
        self.__failures = self.__model_pipeline.failures

    def __process_results(self):
        print(self.__model_pipeline.results.head())
        self.__results = self.__model_pipeline.results

    def __process_status(self):
        print(self.__model_pipeline.status.head())
        self.__status = self.__model_pipeline.status

    def run(self):
        self.__process_failures()
        self.__process_results()
        self.__process_status()

        return (self.__failures, self.__results, self.__status)


class Load:
    __model_pipeline: ModelPipeline

    def __init__(self, model_pipeline: ModelPipeline, output_path: str):
        self.__model_pipeline = model_pipeline
        self.__output_path = output_path

    def __train_model(self):
        pass

    def run(self):
        self.__train_model()
        return
