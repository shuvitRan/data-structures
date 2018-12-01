require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');
const cTable = require('console.table');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'DanRan';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'danDB';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statements for checking your work: 
//var thisQuery = "SELECT * FROM sensorData ORDER BY sensorTime ASC LIMIT 1;"; // print all values
 //SELECT sensorValue, sensorTime from sensorData order by sensorTime;
/* 
var thisQuery=` 
               
                SELECT derivedTable.sensorValue, derivedTable.sensorTime
                FROM (
                    SELECT 
                        sensorValue, sensorTime,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime) AS pSensorValue,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime DESC) AS aSensorValue 
                    FROM sensorData
                ) AS derivedTable
                WHERE (sensorValue='1' AND pSensorValue='0') or (sensorValue='1' AND aSensorValue='0')
                union all  --只用union的话，会把后面加进来的合并并去掉重复的，只显示一条 而union all 会合并上下的query但是 不去重
                SELECT derivedTable.sensorValue, derivedTable.sensorTime
                FROM (
                    SELECT 
                        sensorValue, sensorTime,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime) AS pSensorValue,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime DESC) AS aSensorValue 
                    FROM sensorData
                ) AS derivedTable
                WHERE (sensorValue='1' AND pSensorValue='0' AND aSensorValue='0')
                ORDER by sensorTime;
                `;

*/

var thisQuery=` 
               
            SELECT
                        max
                        (
                        CASE 
                        WHEN (derivedTable.sensorValue='1' AND derivedTable.pSensorValue='0')
                        THEN derivedTable.sensorTime
                        END) AS sensorStartTime,
                         
                        max
                        (
                        CASE 
                        WHEN (derivedTable.sensorValue='1' AND derivedTable.aSensorValue='0')
                        THEN derivedTable.sensorTime
                        END) AS sensorEndTime
                    
                FROM (
                    SELECT 
                        sensorValue, sensorTime,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime) AS pSensorValue,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime DESC) AS aSensorValue
                    FROM sensorData
                ) AS derivedTable
                
                ORDER by sensorStartTime;
                
                `;

var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
//var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue
//var thirdQuery= "SELECT * FROM sensorData ORDER BY sensorTime ASC LIMIT 1;"

var thirdQuery= "SELECT * FROM sensorData ORDER BY sensorTime DESC LIMIT 20;"

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(secondQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(thirdQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
    client.end();
});