# -*- coding: utf-8 -*-
'''
Created on 10 oct. 2019

@author: javi
'''
from kafka import KafkaProducer

class KafkaConnect():
	def __init__(self, servidor):
		self.servidor = servidor    # Servidor donde esta Kafka

	def conectKafka(self):
		print 'conectKafka ==> Inicializamos la conexión con el servidor....'
		try:
			self.producer = KafkaProducer(bootstrap_servers=[self.servidor], api_version=(0,10))
			print 'conectKafka ==> Conectados con el servidor....'
				#value_serializer=lambda x:
				#dumps(x).encode('utf-8'))
		except:
			print 'conectKafka ==> Excepción al inicializar la conexión....'

	def sendMessage(self, topic, value):
		self.producer.send(topic, value=value.encode()).add_errback(self.on_send_error)
		# block until all async messages are sent
		self.producer.flush()		
		print 'Mensaje Enviado....'
	
	def on_send_error(self, excp):
		print 'I am an errback ' + excp
	
