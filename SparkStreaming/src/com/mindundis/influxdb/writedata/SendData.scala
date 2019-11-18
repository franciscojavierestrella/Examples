package com.mindundis.influxDB.writedata
import java.io._
import org.apache.commons._
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.{HttpClientBuilder}

class UnknownSendDataInfluxDBException extends Exception

object HttpPostData {
  
  def sendData(url: String, data: String): Unit = {
    println("HttpPostData => url " + url + " mensaje " +  data)
    val client = HttpClientBuilder.create().build();
    val response = client.execute(postRequest(url, data))
    val entity = response.getEntity
    println("HttpPostData => Entity " + entity)
    if ( entity == null )
      throw new UnknownSendDataInfluxDBException()
    println("--- HEADERS ---")
    response.getAllHeaders.foreach(arg => println(arg))
  }
    
  private def postRequest(url: String, payload: String): HttpPost = {
    //"http://localhost:8086/write?db=testiot"
    val post = new HttpPost(url)
    post.setEntity(new StringEntity(payload))
    post
  }
}