# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 17:35:15 2019

@author: javi
"""
import sys
from random import randrange,random
from datetime import datetime, timedelta

class SinteticData():
	def __init__(self):
		print " Clase inicialzada"
	
	def Fecha(self, start, end, fmt = "%d/%m/%Y"):
		s = datetime.strptime(start, fmt)
		e = datetime.strptime(end, fmt)    
		delta = e - s
		while True:
			r = s + timedelta(days=(randrange(0,12) * 30))
			midelta = e - r
			if midelta.days < delta.days:
				break
		return r.strftime(fmt)	

	def Entero(self, inicio, final):
		return randrange(inicio,final)

