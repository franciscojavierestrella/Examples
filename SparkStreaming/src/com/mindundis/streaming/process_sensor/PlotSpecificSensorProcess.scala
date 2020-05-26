package com.mindundis.streaming.process_sensor

import java.io.PrintWriter
import java.net.Socket
import java.util.Date
import com.mindundis.influxDB.writedata.HttpPostData


import com.mindundis.streaming.entity.Sensor
import org.apache.spark.streaming.dstream.DStream


class PlotSpecificSensorProcess extends TaskStreamingProcessSensor {

  override def process(meassureStream: DStream[Sensor]): Unit = {
    meassureStream.
      filter(
          // Filtramos por 3 códigos de sensor...
        m => m.isValid && (m.sensor == "28079009" || m.sensor == "28079035" || m.sensor == "28079005") 
      ).foreachRDD(rdd =>{
         rdd.collect().foreach( m => {
           // Enviamos la medida para los sensores filtrados.
           println ( " Valor de la medida " + m.code )  
           toGrafana(m.sensor, m.code, m.value, 1,  m.latitude, m.longitude, false)
         }           
        )
    })
  }
  
  def toGrafana(sensor: String, 
                code: String,
                value: Double, 
                count: Int, 
                latitude: String,
                longitude: String,
                isTumbling: Boolean): Unit = {
    val windowType = if (isTumbling) "_tumbling" else "_sliding"
    val message = s"meassure_specific,op=${code} sensor=${sensor},latitude=${latitude},longitude=${longitude},value=${value}"
    println("Sending msg to Grafana: " + message)
    HttpPostData.sendData("http://localhost:8086/write?db=sensor", message)
  }

}

object PlotSpecificSensorProcess {
  def sendToGraphite(itr: Iterator[Sensor]): Unit = {
    val socket = new Socket("192.168.1.19", 2003)
    val out = new PrintWriter(socket.getOutputStream(), true)
    itr.foreach(m => {
      //val graphiteMsg = s"local.pollution.specific ${m.value} ${m.fecha.getTime / 1000}"
      val graphiteMsg = s"local.pollution.specific ${m.value} "
      println("Sending msg to graphite: " + graphiteMsg)
      out.println(graphiteMsg)
    })
    out.close()
    socket.close()
  }
}