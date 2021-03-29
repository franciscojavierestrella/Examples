package com.mindundis.streaming.entity

import java.text.SimpleDateFormat
import java.util.Date

import scala.io.Source

case class Sensor (sensor: String, code: String, value: Double, latitude: String, longitude: String, isValid: Boolean)

object Sensor {
    
  val fakeSensor = new Sensor("", "", 0.0, "", "", false)

  def getNormalizedValue(rawValue: String): (Double, Boolean) = {
    val isValid = rawValue.endsWith("V")
    (rawValue.substring(0, rawValue.length - 1).toDouble, isValid)
  }

  def apply(csvLine: String): Sensor = {
    try {
      println (" Linea recibida => " + csvLine)
      val Array( sensor, code, year, month, day, time, latitude, longitude, value) =
        csvLine.split(";").map(_.trim)

      val hourIn24hFormat = 12
      val hourStr =
        if (hourIn24hFormat < 10)
          "0" + hourIn24hFormat.toString
        else
          hourIn24hFormat.toString

      val fecha = new SimpleDateFormat("yyyyMMddhhmmss").parse(s"$year$month$day${time}0000")

      val (doubleValue, isValid) =
        if (fecha != null)
          getNormalizedValue(value)
        else
          (0.0, false)

      new Sensor(
        sensor,
        code,
        doubleValue,
        latitude,
        longitude,
        isValid
      )
    } catch {
      case e: Exception => {
        println(s"""Exception parsing line "$csvLine" Exception: $e""")
        fakeSensor
      }
    }
  }
}