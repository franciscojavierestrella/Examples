'''
Created on 17 oct. 2019

@author: javi
'''
from KafkaConnector.KafkaCon import KafkaConnect
from Pollution.PollutionData import PollutionData
import os
import time

if __name__ == '__main__':
    conector = KafkaConnect('quickstart.cloudera:9092')
    
    sleep = (int)( input("Enter a value sleeping: ")) 
    
    print (os.getcwd())
    pollutionData = PollutionData("..\\resources\\pollutants.csv","..\\resources\\stations.csv");
    
    conector.conectKafka()

    data = pollutionData.get_measssures_fechas(10000, '20/10/2019', '31/10/2019');
     
    for element in data:
        print (" Dato generado  " + str(element))    
      
    for item in data:
        time.sleep(sleep)
        conector.sendMessage('station-meassures', item)
    
