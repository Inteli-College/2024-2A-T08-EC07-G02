import os


class ModelService:
	def __init__(self):
		self.model = None

	def predict(self, KNR):
		return self.model.predict(KNR)

	def new_knr(self, row):
		self.model.new_knr(row)