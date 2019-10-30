package com.mindundis.streaming.process

import java.io.PrintWriter
import java.net.Socket

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.dstream.DStream

/**
  *
  * Writes the value of every meassure of every station in local.pollution.<station_name>.<substance_name>
  * for the date they were emited.
  *
  */

class PlotAllMeassuresProcess extends TaskStreamingProcess {
  override def process(meassureStream: DStream[Meassure]): Unit = {
    meassureStream.
      filter(m => m.isValid).foreachRDD(rdd =>{
        rdd.foreachPartition(itr => {
          val socket = new Socket("192.168.1.16", 2003)
          val out = new PrintWriter(socket.getOutputStream(), true)
          itr.foreach(m => {
            val graphiteMsg = s"local.pollution.station_${m.station}.${m.substanceId} ${m.value} ${m.date.getTime/ 1000}"
            println("Sending msg to graphite: " + graphiteMsg)
            out.println(graphiteMsg)
          })
          out.close()
          socket.close()
        })
    })
  }
}
