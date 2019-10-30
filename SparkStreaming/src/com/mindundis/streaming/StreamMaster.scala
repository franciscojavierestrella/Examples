package com.mindundis.streaming

import java.io.InputStream
import java.util.Properties
import java.io.FileInputStream


import com.mindundis.streaming.entity.Meassure
import com.mindundis.streaming.process.TaskStreamingProcess
import org.apache.spark.SparkConf
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.StreamingContext
import org.apache.spark.streaming.dstream.{DStream, ReceiverInputDStream}
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.apache.spark.streaming.kafka._
import kafka.serializer.StringDecoder
import kafka.serializer.DefaultDecoder

import scala.collection.JavaConverters._

object StreamMaster {
  
  def getCustomProperties(): Map[String, String] = {
    val prop = new Properties()
    prop.load(new FileInputStream("src/resources/streaming.properties"))
    
    prop.asScala.toMap
  }
  
  def createKafkaStream(ssc: StreamingContext, appProperties: Map[String, String]): ReceiverInputDStream[(String, String)] = {
    val kafkaParams = Map[String, String]("metadata.broker.list" -> appProperties("kafka_broker_list"),"zookeeper.connect" -> appProperties("zookeper_host"), "group.id" -> "gc_1" , "zookeeper.connection.timeout.ms" -> "1000")
    
    KafkaUtils.createStream[String, String, StringDecoder, StringDecoder](ssc, kafkaParams, Map(appProperties("topic") -> 1), StorageLevel.MEMORY_ONLY_SER)
    
  }

  
  def createStreamingContext(appProperties: Map[String, String],
                             process: TaskStreamingProcess,
                             processName: String): StreamingContext = {
    
    val sparkConf = new SparkConf().setAppName(s"Ambiental meassures - SStreaming, process: ${processName}")
    //sparkConf.set("spark.streaming.blockInterval", "200ms")
    if (sparkConf.getOption("spark.master").isEmpty)
      sparkConf.setMaster(appProperties("spark_master_if_undefined"))

    val ssc = new StreamingContext(sparkConf, process.batchDuration)    
      
    ssc.sparkContext.setLogLevel("OFF")
    ssc.checkpoint(appProperties("chekpoint_dir"))      
    ssc
  }  
  
  
  def main(args: Array[String]): Unit = {
    if (args.length != 1) {
      print(s"Usage: StreamMaster <process_name>")
      sys.exit(1)
    }

    val processName = args(0)
    val appProperties = getCustomProperties()
    val process = TaskStreamingProcess.createProcess(processName)
    
    val ssc = createStreamingContext(appProperties, process, processName)
    val messages: ReceiverInputDStream[(String, String)] = createKafkaStream(ssc, appProperties)

    val meassures: DStream[Meassure] =
      messages.map{ case (_, csvMeassure) => Meassure(csvMeassure)}

    process.process(meassures)
    
    // Starting the computation
    ssc.start()
    ssc.awaitTermination()    
    
  }
  
}