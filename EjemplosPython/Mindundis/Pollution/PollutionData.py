# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 17:35:15 2019

@author: javi
"""
import sys
from RandomValues.RandomGenerating import SinteticData
from Pollution.DataSet import DataSet
from datetime import timedelta, datetime

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
	
	def get_measssures(self, elements, fecha, hora_inicio, hora_fin):
		medidas = []
		for j in range(1, elements):
			for i in range(hora_inicio, hora_fin):
				medida = self.get_measssure(i, fecha[2], fecha[1], fecha[0])
				medidas.insert(0, medida)
		return medidas 

	def get_measssures_fechas(self, elements, fecha1, fecha2):
		medidas = []
		date1 = datetime.strptime(fecha1, '%d/%m/%Y')
		date2 = datetime.strptime(fecha2, '%d/%m/%Y')		
		delta = date2 -date1
		days = delta.days
		
		tamanyo = elements / days
		slot = (elements / tamanyo)
		
		print (" Slot " + str(slot) + " Tamanyo " + str(tamanyo) + " Days "+ str(days))
		for z in range(0,slot):
			dist_hour = tamanyo / 23
			contador = 0
			hour = 0
			print (" Distribución " + str(dist_hour) + " Contador " + str(contador) + " Hour "+ str(hour))			
			for j in range(1, tamanyo):
				medida = self.get_measssure(hour, date1.year, date1.month, date1.day)
				medidas.insert(len(medidas), medida)
				if contador == dist_hour:
					hour = hour +1
					contador = 0
				contador = contador + 1
			date1 = date1 + timedelta(days=1)
		return medidas 	
	
	