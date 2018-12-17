# Sensor Data:

### "When I am sitting in my room" 
This is a sensor data visualization project. 

An infrared light sensor is placed under my daily working desk in my apartment. By using the Particle's Photon board and its Web IDE, my sitting data and its time information are sent and stored to an AWS PostgreSQL database. If I am sitting in front of my desk, the sensor will return 1. Otherwise it will return 0. The data is collected once a minute. Each day there are more than thousands of records stored. By the time I write this documentation, there are over 33195 rows of records. 

![sensorLocation](https://github.com/BounceRan/data-structures/blob/master/Final/public/sensorData/doc/sensorlocation.png)
----
### Design Aspect:

The front end design will be only showing the time period of my sitting. Thus, on the server side, I am using an argorisim for the query which will only return the start and end records from the whole data set. This helped a lot with the query efficiency. 

![sensordata](https://github.com/BounceRan/data-structures/blob/master/Final/public/sensorData/doc/sensorData.png)

All the front end component is dynamic, and the timeline UI is created by using P5.js. According to the querying data from the server, the canvas will generate the right width and height to contain all the timelines. 

****

### More
Another big section for this project is the front end design and development. There are many works in recalculating the timestamp according to the data return from the server. With the help of the moment.js library, I created functions such as finding out how many recording days exist, comparing and remaping each period into the right positions.  

### Front-End Logic:
1. waiting Fetch to get sitting data from the server.
2. separate the data to starting point array and ending point array.
3. compare the date, find out how many days are in the records.
4. draw the lines for each day(start from 6 am to the next day’s 6 am).
5. compare the day and put start and end point on the right day. 
6. calculate the sitting hours for each day.
7. calculate the average sitting hours. 

*****
### Final Implementation

![finalImplementation](https://github.com/BounceRan/data-structures/blob/master/Final/public/sensorData/doc/SensorFinalIm.png)

