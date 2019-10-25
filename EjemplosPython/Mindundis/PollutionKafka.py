'''
Created on 17 oct. 2019

@author: javi
'''
from KafkaConnector.KafkaCon import KafkaConnect
from Pollution.PollutionData import PollutionData
import os

if __name__ == '__main__':
    conector = KafkaConnect('quickstart.cloudera:9092')
    
    print os.getcwd()
    pollutionData = PollutionData("..\\resources\\pollutants.csv","..\\resources\\stations.csv");
    
    conector.conectKafka()
    conector.sendMessage('station-meassures', 'me cago en la puta')

    data = pollutionData.get_measssures(100, 2019, 11, 12, 0, 2);
    
    for element in data:
        print (" Dato generado  " + str(element))