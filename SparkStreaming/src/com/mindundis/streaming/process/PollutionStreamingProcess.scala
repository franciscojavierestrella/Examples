package com.mindundis.streaming.process

import com.mindundis.streaming.entity.Meassure
import org.apache.spark.streaming.{Duration, Seconds}
import org.apache.spark.streaming.dstream.DStream

trait TaskStreamingProcess {
  val isCheckpointingEnabled = false
  val batchDuration: Duration = Seconds(1)
  def process(meassureStream: DStream[Meassure])
}

class UnknownTaskStreamingProcessException extends Exception

object TaskStreamingProcess {
  def createProcess(processName: String): TaskStreamingProcess = {
    processName match {
      case "COUNT_MEASSURES" => new PrintMeassuresCountProcess()
      case "PLOT_ALL_MEASSURES" => new PlotAllMeassuresProcess()
      case "PLOT_ERROR_COUNT" => new PlotErrorCountProcess()
      case "PLOT_SPECIFIC_STATION_AND_SUBSTANCE" => new PlotSpecificMeassureProcess()
      case "COUNT_EVENTS_IN_WINDOW" => new CountEventsInWindowProcess()
      case "AVG_MEASSURE_PROCESS" => new AvgMeassuresProcess(secondsWindow = 12, secondsSlide = 12)
      case "AVG_MEASSURE_PROCESS_GRAFANA" => new AvgMeassuresProcessGrafana(secondsWindow = 12, secondsSlide = 12)
      case "AVG_MEASSURE_PROCESS_SLIDING" => new AvgMeassuresProcess(secondsWindow = 12, secondsSlide = 3)
      case "EXTREME_HOUR_PROCESS" => new ExtremeHoursProcess()
      case "EXTREME_HOUR_WITH_STATE_PROCESS" => new ExtremeHoursWithStateProcess()
      case _ => throw new UnknownTaskStreamingProcessException()
    }
  }
}
