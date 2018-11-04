require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');
const cTable = require('console.table');//npm install console.table --save

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

// Query Guide *****************
// zone,length
// m01,22
// m02,29
// m03,74
// m04,53
// m05,28
// m06,63
// m07,53--
// m08,26
// m09,4
// m10,22
// id serial PRIMARY KEY,
// address VARCHAR(100),
// lat DOUBLE precision,
// long DOUBLE precision,
// mtgroup VARCHAR(100),
// mtlocation VARCHAR(100),
// wheelchair BOOLEAN,
// mtdate VARCHAR [],
// mtstart VARCHAR [],
// mtend VARCHAR [],
// mttype VARCHAR [],
// mtspin TEXT [],
// mtzone SMALLINT


//query array obj
var thisQuery = "SELECT mtgroup, mtspin, mtzone, mtlocation, address, mttype FROM aainfo WHERE 'Monday' = ANY (mtdate)";
//var thisQuery = "SELECT mtgroup, mtspin, mtzone, mtlocation, address, mttype FROM aainfo WHERE  'Women'= ANY(mtspin) ";
//var thisQuery = "SELECT * FROM aainfo WHERE mtzone=7;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});