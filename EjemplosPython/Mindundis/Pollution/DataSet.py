# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 17:35:15 2019

@author: javi
"""
import pandas as pd

class DataSet():
    def __init__(self, filename):
        print " Clase inicializada"
        self.filename = filename;
        self._loadresource();

    def get_pollutants(self):
        return self.pollutants;
    
    def get_data(self, row, column):
        return self.pollutants.iloc[column,row];
    
    def _loadresource(self):
        self.pollutants = pd.read_csv (self.filename , sep=",")

