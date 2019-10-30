package com.mindundis.streaming.entity

import java.text.SimpleDateFormat
import java.util.Date

import scala.io.Source

case class Meassure (station: String, substanceId: String, date: Date, value: Double, isValid: Boolean)

object Meassure {
  private def getResourceFileLines(fileName: String): List[String] =
    Source.fromFile(fileName).getLines.toList


  val pollutants: List[Pollutant] =  {
      getResourceFileLines("src/resources/pollutants.csv").map(
        line => {
          val Array(id, name, shortName) = line.split(",").map(_.trim)
          Pollutant(id, name, shortName)
        })
  }

  val stations: List[Station] =  {
      getResourceFileLines("src/resources/stations.csv").map(
        line => {
          val Array(id, name) = line.split(",").map(_.trim)
          Station(id, name)
        })
  }

  val pollutantsById: Map[String, Pollutant] = pollutants.map(p => (p.id, p)).toMap
  val stationsById: Map[String, Station] = stations.map(p => (p.id, p)).toMap

  //When there is a change in the station they sometimes rename it
  // with a suffix starting by "_" which we can ignore.
  val STATION_SUFIX_PATTERN = "_.*$".r

  val fakeMeassure = new Meassure("", "", null, 0.0, false)

  def getNormalizedValue(rawValue: String): (Double, Boolean) = {
    val isValid = rawValue.endsWith("V")
    (rawValue.substring(0, rawValue.length - 1).toDouble, isValid)
  }

  def apply(csvLine: String): Meassure = {
    try {
      //println (" Linea recibida => " + csvLine)
      val Array(hour, _, _, _, substance, station, year, month, day, _, value) =
        csvLine.split(";").map(_.trim)

      val hourIn24hFormat = hour.toInt - 1
      val hourStr =
        if (hourIn24hFormat < 10)
          "0" + hourIn24hFormat.toString
        else
          hourIn24hFormat.toString

      val date = new SimpleDateFormat("yyyyMMddhhmmss").parse(s"$year$month$day${hourStr}0000")

      val (doubleValue, isValid) =
        if (date != null)
          getNormalizedValue(value)
        else
          (0.0, false)

      new Meassure(
        stationsById(STATION_SUFIX_PATTERN.replaceAllIn(station, "")).name,
        pollutantsById(substance).shortName,
        date,
        doubleValue,
        isValid
      )
    } catch {
      case e: Exception => {
        println(s"""Exception parsing line "$csvLine" Exception: $e""")
        fakeMeassure
      }
    }
  }
}