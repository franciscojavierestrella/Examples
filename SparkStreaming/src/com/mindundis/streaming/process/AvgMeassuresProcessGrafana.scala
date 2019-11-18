package com.mindundis.streaming.process

import java.io.PrintWriter
import java.util.Date
import com.mindundis.influxDB.writedata.HttpPostData

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.Seconds
import org.apache.spark.streaming.dstream.DStream


class AvgMeassuresProcessGrafana(secondsWindow: Int, secondsSlide: Int) extends TaskStreamingProcess {

  override def process(meassureStream: DStream[Meassure]): Unit = {
    val meassuresPair: DStream[((Date, String), (Double, Int))] = meassureStream.
      filter(_.isValid).
      map(m => {
        val dateWithNoHours = new Date(m.date.getYear, m.date.getMonth, m.date.getDate)
        ((dateWithNoHours, m.substanceId), (m.value, 1))
      })

    val avgInWindowDStream: DStream[((Date, String), (Double, Int))] = meassuresPair.reduceByKeyAndWindow(
        reduceFunc = AvgMeassuresProcessGraf.avgReduceByWindow,
        windowDuration = Seconds(secondsWindow),
        slideDuration = Seconds(secondsSlide)
      )

    avgInWindowDStream.foreachRDD(rdd => {

        println( " Recolectamos los datos y para la partición ..." )
        rdd.collect().foreach {
          case ((date, substance), (value, count)) =>
            AvgMeassuresProcessGraf.toGrafana(substance, value, count, date, secondsSlide.equals(secondsWindow))
        }
    })
  }
}
object AvgMeassuresProcessGraf {

  def avgReduceByWindow(m1: (Double, Int), m2: (Double, Int)) = {
    val (value1, count1) = m1
    val (value2, count2) = m2

    (value1 + value2, count1 + count2)
  }
  def toGrafana(substance: String,
                 value: Double, count: Int, date: Date, isTumbling: Boolean): Unit = {
    val windowType = if (isTumbling) "_tumbling" else "_sliding"
    val message = s"average,substance=${substance} value=${value / count}"
    println("Sending msg to Grafana: " + message)
    HttpPostData.sendData("http://localhost:8086/write?db=testiot", message)
  }
}