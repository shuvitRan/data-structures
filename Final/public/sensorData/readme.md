# Sensor Data:

### "When I am sitting in my room"
is a sensor data visualization project. 

An infrared light sensor is placed under my daily working desk in my apartment. By using the Particle's Photon board and its Web IDE, my sitting data and its time information are sent and stored to an AWS PostgreSQL database. If I am sitting in front of my desk, the sensor will return 1. Otherwise it will return 0. The data is collected once a minute. Each day there are more than thousands of records stored. By the time I write this documentation, there are over 33195 rows of records. 

### Design Aspect:

The front end design will be only showing the time period of my sitting. Thus, on the server side, I am using an argorisim for the query which will only return the start and end records from the whole data set. This helped a lot with the query efficiency. 

All the front end component is dynamic, and the timeline UI is created by using P5.js. According to the querying data from the server, the canvas will generate the right width and height to contain all the timelines. 

### More
Another big section for this project is the front end design and development. There are many works in recalculating the timestamp according to the data return from the server. With the help of the moment.js library, I created functions such as finding out how many recording days exist, comparing and remaping each period into the right positions.  