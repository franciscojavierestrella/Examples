package com.mindundis.streaming.process

import java.io.PrintWriter
import java.net.Socket
import java.util.Date

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.rdd.RDD
import org.apache.spark.streaming.dstream.DStream

/**
  *
  * Populates a chart with error count in local.pollution_errors.error and local.pollution_errors.ok
  * as they evolve in time starting at the moment it is launched.
  *
  */
class PlotErrorCountProcess extends TaskStreamingProcess {
  override def process(meassureStream: DStream[Meassure]): Unit = {
    meassureStream.foreachRDD(rdd =>{
      val rddByError: RDD[(String, Int)] = rdd.groupBy(m => m.isValid).
        map {
          case (isValid, itr) =>
            (if (isValid) "ok" else "error", itr.size)
        }
      rddByError.foreach {
        case(errorLabel, count) => {
          val socket = new Socket("192.168.1.16", 2003)
          val out = new PrintWriter(socket.getOutputStream(), true)
          val graphiteMsg = s"local.pollution_errors.$errorLabel $count ${new Date().getTime / 1000}"
          println("Sending msg to graphite: " + graphiteMsg)
          out.println(graphiteMsg)
          out.close()
          socket.close()
        }
      }
    })
  }
}
