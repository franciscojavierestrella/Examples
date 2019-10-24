'''
Created on 30 nov. 2018

@author: javi
'''
from KafkaConnector.KafkaCon import KafkaConnect

if __name__ == '__main__':
    conector = KafkaConnect('quickstart.cloudera:9092')
    
    conector.conectKafka()
    conector.sendMessage('station-meassures', 'me cago en la puta')
