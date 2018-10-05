require('dotenv').config()
const { Client } = require('pg');

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

// Sample SQL statement to create a table with a id: 
var thisQuery = "CREATE TABLE aalocations (id serial PRIMARY KEY,address varchar(100), lat double precision, long double precision);";
// Sample SQL statement to delete a table: 
 //var thisQuery = "DROP TABLE aalocations;"; 
 //Sample SQL statement to query the entire contents of a table: 
 //var thisQuery = "SELECT * FROM aalocations;";
//Testing different select way 
 //var thisQuery = "SELECT address FROM aalocations";
 //var thisQuery= "SELECT COUNT(address) FROM aalocations ";
 

    
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});