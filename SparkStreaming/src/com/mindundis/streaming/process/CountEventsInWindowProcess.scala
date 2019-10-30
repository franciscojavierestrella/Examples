package com.mindundis.streaming.process

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.{Duration, Seconds}
import org.apache.spark.streaming.dstream.DStream

/**
  * Counts the microbatch meassures and the meassures in a window
  *
  */
class CountEventsInWindowProcess extends TaskStreamingProcess {
  override val batchDuration: Duration = Seconds(2)

  override def process(meassureStream: DStream[Meassure]): Unit = {
    meassureStream.foreachRDD(rdd => println("Batch partitions: " + rdd.partitions.length))
    val microbatchCount = meassureStream.count().map(count => "microbatch count: " + count)
    microbatchCount.print()
    val windowCount = meassureStream.
      window(Seconds(6), Seconds(6)).
      count().map(count => "window count: " + count)
    windowCount.cache()
    windowCount.foreachRDD(rdd => println("Window partitions: " + rdd.partitions.length))
    windowCount.print()
  }
}
