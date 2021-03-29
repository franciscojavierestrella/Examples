package com.mindundis.streaming.process

import java.io.PrintWriter
import java.net.Socket

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.dstream.DStream


class PlotSpecificMeassureProcess extends TaskStreamingProcess {

  override def process(meassureStream: DStream[Meassure]): Unit = {
    meassureStream.
      filter(
        m => m.isValid && m.station ==  "Vallecas" //FIXME: Add condition for a specific station and a specific substance
      ).foreachRDD(rdd =>{
         rdd.collect().foreach( m => {
           println ( " Valor de la medida " + m.station )           
         }           
        )
    })
  }
}

object PlotSpecificMeassureProcess {
  def sendToGraphite(itr: Iterator[Meassure]): Unit = {
    val socket = new Socket("192.168.1.19", 2003)
    val out = new PrintWriter(socket.getOutputStream(), true)
    itr.foreach(m => {
      val graphiteMsg = s"local.pollution.specific ${m.value} ${m.date.getTime / 1000}"
      println("Sending msg to graphite: " + graphiteMsg)
      out.println(graphiteMsg)
    })
    out.close()
    socket.close()
  }
}