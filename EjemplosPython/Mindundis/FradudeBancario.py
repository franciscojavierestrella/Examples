'''
Created on 30 nov. 2018

@author: javi
'''
from KafkaConnector.KafkaCon import KafkaConnect
from RandomValues.RandomGenerating import SinteticData

if __name__ == '__main__':
    conector = KafkaConnect('quickstart.cloudera:9092')
    
    conector.conectKafka()
    conector.sendMessage('bank-transaction', 'mensaje....')

