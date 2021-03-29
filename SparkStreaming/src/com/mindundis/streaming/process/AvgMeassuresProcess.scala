package com.mindundis.streaming.process

import java.io.PrintWriter
import java.net.Socket
import java.util.Date

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.Seconds
import org.apache.spark.streaming.dstream.DStream


class AvgMeassuresProcess(secondsWindow: Int, secondsSlide: Int) extends TaskStreamingProcess {

  override def process(meassureStream: DStream[Meassure]): Unit = {
    val meassuresPair: DStream[((Date, String), (Double, Int))] = meassureStream.
      filter(_.isValid).
      map(m => {
        val dateWithNoHours = new Date(m.date.getYear, m.date.getMonth, m.date.getDate)
        ((dateWithNoHours, m.substanceId), (m.value, 1))
      })

    val avgInWindowDStream: DStream[((Date, String), (Double, Int))] = meassuresPair.reduceByKeyAndWindow(
        reduceFunc = AvgMeassuresProcess.avgReduceByWindow,
        windowDuration = Seconds(secondsWindow),
        slideDuration = Seconds(secondsSlide)
      )

    avgInWindowDStream.foreachRDD(rdd => {
        println( " Procesamos una ventana..." )
        val socket = new Socket("192.168.1.19", 2003)
        val out = new PrintWriter(socket.getOutputStream(), true)

        println( " Recolectamos los datos y para la partición ..." )
        rdd.collect().foreach {
          case ((date, substance), (value, count)) =>
            AvgMeassuresProcess.toGraphite(out, substance, value, count, date, secondsSlide.equals(secondsWindow))
        }
        out.close()
        socket.close()
    })
  }
}
object AvgMeassuresProcess {

  def avgReduceByWindow(m1: (Double, Int), m2: (Double, Int)) = {
    val (value1, count1) = m1
    val (value2, count2) = m2

    (value1 + value2, count1 + count2)
  }
  def toGraphite(out: PrintWriter, substance: String,
                 value: Double, count: Int, date: Date, isTumbling: Boolean): Unit = {
    val windowType = if (isTumbling) "_tumbling" else "_sliding"
    val graphiteMsg = s"local.pollution.pollutant_average${windowType}.${substance} ${value / count} ${date.getTime/ 1000}"
    println("Sending msg to graphite: " + graphiteMsg)
    out.println(graphiteMsg)
  }
}