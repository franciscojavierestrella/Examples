package com.mindundis.streaming.process

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.dstream.DStream

/**
  *
  * Print the worst and the best hour for going out.
  *
  */
class ExtremeHoursWithStateProcess extends TaskStreamingProcess {
  override def process(meassureStream: DStream[Meassure]): Unit = {

    val dsValuesAndCounts: DStream[(Int, (Double, Int))] = meassureStream.
    filter(_.isValid).
      map(m => (m.date.getHours, (m.value, 1)))

    dsValuesAndCounts.updateStateByKey(ExtremeHoursWithStateProcess.updateFunction).map{
      case (hour, (sum, count)) => (hour, sum / count )
    }.transform(rdd => {
      rdd.sortBy{case (hour, value) => value}
    }).print(24)
  }
}

object ExtremeHoursWithStateProcess {
  def updateFunction(values: Seq[(Double, Int)],
                     state: Option[(Double, Int)]): Option[(Double, Int)] = {

    if (values.isEmpty) {
      state
    } else {
      val (sum, count) = values.reduce[(Double, Int)] {
        case ((sum1, count1), (sum2, count2)) => (sum1 + sum2, count1 + count2)
      }
      state match {
        case None => Some((sum, count))
        case Some((stateSum, stateCount)) => Some((sum + stateSum, count + stateCount))
      }
    }
  }
}