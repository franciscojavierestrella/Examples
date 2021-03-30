# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 17:35:15 2019

@author: javi
"""
import sys
from RandomValues.RandomGenerating import SinteticData
from Sensor.DataSet import DataSet
from datetime import timedelta, datetime

class SensorData():
	def __init__(self, codes, sensores, locations):
		self.sinteticData = SinteticData();
		self.code = DataSet(codes)
		self.sensores = DataSet(sensores)
		self.locations = DataSet(locations)

	def get_sensor(self):
		sensor = self.sensores.get_data(0, self.sinteticData.Entero(0,19));
		return sensor;
		
	def get_value(self, hora, year, month, day):
		sensor = self.get_sensor()
		indice_codigo = self.sinteticData.Entero(0,5)
		code = self.code.get_data(0, indice_codigo);
		value = self.sinteticData.Entero(0,9)
		coordenate = self.get_coordenate()
		hh = self.sinteticData.Entero(0,23)
		mi = self.sinteticData.Entero(0,59)
		ss = self.sinteticData.Entero(0,59)
		medida = "{};{};{};{};{};{:02d}{:02d}{:02d};{};{:05d}V".format(sensor, code, year, month ,day, hh, mi, ss, coordenate, value)
		return medida;
	
	def get_coordenate(self):
		loc = self.sinteticData.Entero(0,29);
		location1 = self.locations.get_data(0, loc);
		location2 = self.locations.get_data(1, loc);
		location = "{};{}".format(location1,location2)
		return location
	
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
		for z in range(0,int(slot)):
			dist_hour = tamanyo / 23
			contador = 0
			hour = 0
			print (" Distribución " + str(dist_hour) + " Contador " + str(contador) + " Hour "+ str(hour))			
			for j in range(1, int(tamanyo)):
				medida = self.get_value(hour, date1.year, date1.month, date1.day)
				medidas.insert(len(medidas), medida)
				if contador == dist_hour:
					hour = hour +1
					contador = 0
				contador = contador + 1
			date1 = date1 + timedelta(days=1)
		return medidas 	
	
	