package com.mindundis.streaming.process_sensor

import java.io.PrintWriter
import java.net.Socket
import java.util.Date
import java.text.SimpleDateFormat
import com.mindundis.influxDB.writedata.HttpPostData

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.expressions.Window
import org.apache.spark.sql.functions._



import com.mindundis.streaming.entity.Sensor
import org.apache.spark.streaming.dstream.DStream

import java.text.SimpleDateFormat
import java.util.Date


class PlotAllSensorProcess (secondsWindow: Int, secondsSlide: Int) extends TaskStreamingProcessSensor {
  
  override def process(meassureStream: DStream[Sensor]): Unit = {
    meassureStream.
      filter(m => m.isValid).foreachRDD(rdd =>{

            println("PlotAllSensorProcess.process ==> Procesamos la ventana. ")
            
            val spark = SparkSession.builder.config(rdd.sparkContext.getConf).getOrCreate()
            import spark.implicits._
                       
            val ventanaSensorDF = rdd.toDF()
            
            // Partimos por los diferentes sensores y ordenamos por el código de operación y valor ascendente
            val partitionWindow = Window.partitionBy($"sensor").orderBy($"code".asc, $"value".asc)
            val lastValTest = row_number().over(partitionWindow)
            ventanaSensorDF.select($"*", lastValTest as "last_val").createOrReplaceTempView("ventanaSensores")
            
            // Selecionamos el primer valor del ranking.
            val resultado =  spark.sql(" SELECT sensor, code, value, latitude, longitude, isvalid  FROM ventanaSensores where last_val = 1").as[Sensor];
           
            //Enviamos el conjunto de medidas obtenidas.
            if ( resultado.count() > 0 )
              println("PlotAllSensorProcess.process ==> procesados " + resultado.count())
              resultado.rdd.collect().foreach(m => { 
                  toGrafana(m.sensor, m.code, m.value, m.latitude, m.longitude)
              })

            // Sobre el DF del flujo enviamos todas las medidas, sin hacer particiones ni ordenaciones sobre las mismas.
            rdd.collect().foreach(m => {
              toGrafanaAllSensores(m.sensor, m.code, m.value, m.latitude, m.longitude)
            })
            println("PlotAllSensorProcess.process ==> la ventana ha sido procesada. ")
      })
  }        

  // Envia los datos calculados como medida de sensores (para los indicadores de tipo de operacion
  def toGrafana(sensor: String, 
                code: String,
                value: Double, 
                latitude: String,
                longitude: String): Unit = {
    val message = s"meassure,op=${code} sensor=${sensor},latitude=${latitude},longitude=${longitude},value=${value}"
    println("Sending msg to Grafana: " + message)
    HttpPostData.sendData("http://localhost:8086/write?db=sensor", message)
  }
  
  // Envia los datos para todos los sensores, cada entrada recibida en la ventana
  def toGrafanaAllSensores(sensor: String, 
                code: String,
                value: Double, 
                latitude: String,
                longitude: String): Unit = {
    val message1 = s"devices,sensor=${sensor} op=${code},latitude=${latitude},longitude=${longitude},value=${value}"
    println("Sending msg to Grafana: " + message1)
    HttpPostData.sendData("http://localhost:8086/write?db=sensor", message1)
  }
  

  
}
