package com.mindundis.streaming.process

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.{Duration, Seconds}
import org.apache.spark.streaming.dstream.DStream

/**
  *
  * Print the worst and the best hour for going out.
  *
  */
class ExtremeHoursProcess extends TaskStreamingProcess {
  override val batchDuration: Duration = Seconds(10)

  override def process(meassureStream: DStream[Meassure]): Unit = {
      val windowedAvgs = meassureStream.
      filter(_.isValid).
        window(Seconds(20), Seconds(20)).
        map(m => (m.date.getHours, (m.value, 1))).
        reduceByKey{case ((sum1, count1), (sum2, count2)) => (sum1 + sum2, count1 + count2)}.
        map{case (hour, (sum, count)) => (hour, sum /count)}

        ExtremeHoursProcess.getSortedByHour(windowedAvgs)
          .print(24)
  }
}
object ExtremeHoursProcess {
  def getSortedByHour(dStream: DStream[(Int, Double)]): DStream[(Int, Double)] = {
    //FIXME: Implement this
    dStream.transform(rdd => {
      rdd.sortBy{case (hour, value) => value}})
  }
}
