require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');
const cTable = require('console.table');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'DanRan';
db_credentials.host = 'mydbinstance.csyaktpfvlzf.us-east-2.rds.amazonaws.com';
db_credentials.database = 'danDB';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();



//var thisQuery = "CREATE TABLE sensorData ( sensorValue boolean, sensorTime timestamp DEFAULT current_timestamp );";
// 正确的时间
//var thisQuery = "CREATE TABLE sensorData ( sensorValue boolean, sensorTime timestamp  DEFAULT (current_timestamp AT TIME ZONE 'EST'));";
//var thisQuery = "CREATE TABLE sensorData ( sensorValue boolean, sensorTime timestamp WITH TIME ZONE DEFAULT current_timestamp);";

// Sample SQL statement to create a table with a id: 
 //var thisQuery = "CREATE TABLE aalocations (id serial PRIMARY KEY,address varchar(100), lat double precision, long double precision);";
 
 //var thisQuery = "SELECT * FROM sensorData;"; 
  //var thisQuery = "DROP TABLE sensorData;";
 
 
// Sample SQL statement to delete a table: 
 
 //Sample SQL statement to query the entire contents of a table: 
//var thisQuery = "SELECT * FROM aainfo WHERE mtzone=6;";
//var hisQuery = "DELETE FROM aainfo WHERE mtzone=7;";
//Testing different select way 
 //var thisQuery = "SELECT address FROM aalocations";
 //var thisQuery= "SELECT COUNT(address) FROM aalocations ";
 
    
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});