require('dotenv').config({ path: '../../.env' });
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

// Sample SQL statement to create a table with a id: 
 //var thisQuery = "CREATE TABLE aalocations (id serial PRIMARY KEY,address varchar(100), lat double precision, long double precision);";
 
 
   var thisQuery = `CREATE TABLE aainfoAll (id serial PRIMARY KEY,
                                            address VARCHAR(100),
                                            lat DOUBLE precision,
                                            lng DOUBLE precision,
                                            mtgroup VARCHAR(100),
                                            mtlocation VARCHAR(100),
                                            wheelchair BOOLEAN,
                                            mtday VARCHAR(50),
                                            mtstart VARCHAR(50),
                                            mtend VARCHAR(50),
                                            mttype VARCHAR(100),
                                            mtspin TEXT,
                                            mtzone SMALLINT
                                            );`;
// Sample SQL statement to delete a table: 
 //var thisQuery = "DROP TABLE aainfoAll;"; 
 //Sample SQL statement to query the entire contents of a table: 
//var thisQuery = "SELECT * FROM aainfoAll WHERE mtzone=1;";
//var thisQuery = "DELETE FROM aainfo WHERE mtzone=7;";
//Testing different select way 
 //var thisQuery = "SELECT address FROM aalocations";
 //var thisQuery= "SELECT COUNT(address) FROM aainfoAll ";
 
    
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});