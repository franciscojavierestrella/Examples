'''
Created on 15 abr. 2020

@author: javi
'''
from KafkaConnector.KafkaCon import KafkaConnect
from Sensor.SensorData import SensorData
import os
import time

if __name__ == '__main__':
    conector = KafkaConnect('quickstart.cloudera:9092')
    
    sleep = input("Enter a value sleeping: ") 
    
    print (os.getcwd())
    sensorData = SensorData("..\\resources\\operacion.csv","..\\resources\\sensores.csv", "..\\resources\\locations.csv");
    
    conector.conectKafka()

    data = sensorData.get_measssures_fechas(10000, '20/04/2020', '31/05/2020');
     
    for item in data:
        time.sleep(int(sleep))
        conector.sendMessage('station-iot', item)
        print (" Dato enviado  " + str(item))
    
