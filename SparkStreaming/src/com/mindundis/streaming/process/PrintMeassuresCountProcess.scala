package com.mindundis.streaming.process

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.rdd.RDD
import org.apache.spark.streaming.Milliseconds
import org.apache.spark.streaming.dstream.DStream

class PrintMeassuresCountProcess extends TaskStreamingProcess {
  override val batchDuration = Milliseconds(50)

  def getCount(rdd: RDD[Meassure]): Long = {
    //simulateDelay()
    val count = rdd.count()
    count
  }
  override def process(meassureStream: DStream[Meassure]): Unit = {

    meassureStream.foreachRDD(rdd => {

      val count = getCount(rdd)
      if (count > 0)
        println("RDD count: " + count)
    })
  }
  
  private def simulateDelay() = {
    def sucession(n: Long): Long =
      if (n == 1) 1 else n + sucession(n - 1)
    val start = System.nanoTime()
    (1 to 1000000).map(x => sucession(100)).reduce(_ + _)
    println(s"Simulate delay: ${System.nanoTime() - start}ns")
  }
}
