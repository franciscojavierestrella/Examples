# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 17:35:15 2019

@author: javi
"""
import sys
from RandomValues.RandomGenerating import SinteticData
from Pollution.DataSet import DataSet

class PollutionData():
	def __init__(self, pollution, stations):
		print " Clase inicializada"
		self.sinteticData = SinteticData();
		self.pollutions = DataSet(pollution)
		self.stations = DataSet(stations)

	def get_station(self):
		station = self.stations.get_data(0, self.sinteticData.Entero(0,43));
		return station;
		
	def get_measssure(self, hora, year, month, day):
		station = self.get_station()
		sustance = self.pollutions.get_data(0, self.sinteticData.Entero(0,16));
		cp = str(station)[0:2];
		code1 = str(station)[2:5];
		code2 = str(station)[5:8];
		#hora = self.sinteticData.Entero(0,24)
		value = self.sinteticData.Entero(1,9)
		medida = "{};{};{};{};{};{};{};{};{};;{:05d}V".format(hora,cp,code1,code2.replace("0", ''),sustance,station,year,month,day, value)
		return medida;
	
	def get_measssures(self, elements, year, month, day, hora_inicio, hora_fin):
		medidas = []
		for j in range(1, elements):
			for i in range(hora_inicio, hora_fin):
				medida = self.get_measssure(i, year, month, day)
				medidas.insert(0, medida)
		return medidas
	