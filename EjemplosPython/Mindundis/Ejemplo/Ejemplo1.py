# Imports the PySpark libraries
from pyspark import SparkConf, SparkContext

# The 'os' library allows us to read the environment variable SPARK_HOME defined in the IDE environment
import os
 

# Configure the Spark context to give a name to the application
sparkConf = SparkConf().setAppName("MyWordCounts")
sc = SparkContext(conf=sparkConf)

# The text file containing the words to count (this is the Spark README file)
textFile = sc.textFile(os.environ["SPARK_HOME"] + "/README.md")

# The code for counting the words (note that the execution mode is lazy)
# Uses the same paradigm Map and Reduce of Hadoop, but fully in memory
wordCounts = textFile.flatMap(lambda line: line.split()) \
.map(lambda word: (word, 1)) \
.reduceByKey(lambda a, b: a + b)
 
# Executes the DAG (Directed Acyclic Graph) for counting and collecting the result
for wc in wordCounts.collect(): print wc
