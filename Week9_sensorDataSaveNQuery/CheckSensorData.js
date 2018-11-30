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
var thisQuery = "SELECT * FROM sensorData ORDER BY sensorTime ASC LIMIT 1;"; // print all values
//var thisQuery ="SELECT * FROM sensorData WHERE( sensorValue= true NOT BETWEEN sensorValue=flase AND sensorValue=true);";
//var thisQuery ="SELECT CASE WHEN( sensorData.sensorValue=true AND LAG(sensorData.sensorValue,1)=false  OVER() )THEN sensorData.sensorValue END FROM sensorData;";

var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

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