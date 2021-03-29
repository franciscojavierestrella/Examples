package com.mindundis.streaming.process_sensor

import com.mindundis.streaming.entity.Sensor
import org.apache.spark.streaming.{Duration, Seconds}
import org.apache.spark.streaming.dstream.DStream

trait TaskStreamingProcessSensor {
  val isCheckpointingEnabled = false
  val batchDuration: Duration = Seconds(1)
  def process(meassureStream: DStream[Sensor])
}

class UnknownTaskStreamingProcessSensorException extends Exception

object TaskStreamingProcessSensor {
  def createProcess(processName: String): TaskStreamingProcessSensor = {
    processName match {
      case "PLOT_ALL_SENSOR" => new PlotAllSensorProcess(secondsWindow = 20, secondsSlide = 20)
      case "PLOT_SPECIFIC_SENSOR" => new PlotSpecificSensorProcess()
      case "COUNT_EVENTS_IN_WINDOW" => new CountEventsInWindowProcess()
      case "AVG_SENSOR_PROCESS_GRAFANA" => new AvgSensorProcessGrafana(secondsWindow = 12, secondsSlide = 12)
      case "AVG_SENSOR_PROCESS_SLIDING" => new AvgSensorProcessGrafana(secondsWindow = 12, secondsSlide = 3)
      case _ => throw new UnknownTaskStreamingProcessSensorException()
    }
  }
}
