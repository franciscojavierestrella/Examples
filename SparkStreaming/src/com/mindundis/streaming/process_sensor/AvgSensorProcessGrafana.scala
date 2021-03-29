package com.mindundis.streaming.process_sensor

import java.io.PrintWriter
import java.util.Date
import com.mindundis.influxDB.writedata.HttpPostData

import com.mindundis.streaming.entity.Sensor
import org.apache.spark.streaming.Seconds
import org.apache.spark.streaming.dstream.DStream


class AvgSensorProcessGrafana(secondsWindow: Int, secondsSlide: Int) extends TaskStreamingProcessSensor {

  override def process(Sensortream: DStream[Sensor]): Unit = {
    val SensorPair: DStream[((String, String), (Double, String, String, Int))] = Sensortream.
      filter(_.isValid).
      map(m => {
        //val dateWithNoHours = new Date(m.fecha.getYear, m.fecha.getMonth, m.fecha.getDate)
        ((m.sensor, m.code), (m.value, m.latitude, m.longitude,  1))
      })

    // Calculamos la media ordenando por sensor y operación sobre el mismo
    val avgInWindowDStream: DStream[(( String, String), (Double, String, String, Int))] = SensorPair.reduceByKeyAndWindow(
        reduceFunc = AvgSensorProcessGraf.avgReduceByWindow,
        windowDuration = Seconds(secondsWindow),
        slideDuration = Seconds(secondsSlide)
      )

    avgInWindowDStream.foreachRDD(rdd => {

        println( " Recolectamos los datos y para la partición ..." )
        rdd.collect().foreach {
          case ((sensor, code), (value, latitude, longitude, count)) =>
            AvgSensorProcessGraf.toGrafana(sensor, code, value, count, latitude, longitude, secondsSlide.equals(secondsWindow))
        }
    })
  }
}
object AvgSensorProcessGraf {

  
  def avgReduceByWindow(m1: (Double, String, String, Int), m2: (Double, String, String, Int)) = {
    val (value1, latitude1, longitude1, count1) = m1
    val (value2, latitude2, longitude2, count2) = m2

    (value1 + value2, latitude1, longitude1, count1 + count2)
  }
  
  def toGrafana(sensor: String, 
                code: String,
                value: Double, 
                count: Int, 
                latitude: String,
                longitude: String,
                isTumbling: Boolean): Unit = {
    val windowType = if (isTumbling) "_tumbling" else "_sliding"
    val message = s"average,sensor=${sensor} op=${code},latitude=${latitude},longitude=${longitude},value=${value / count}"
    println("Sending msg to Grafana: " + message)
    HttpPostData.sendData("http://localhost:8086/write?db=sensor", message)
  }
}