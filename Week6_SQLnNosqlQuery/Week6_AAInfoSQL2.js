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

// Query Guide*****************
//Database Name :aainfoAll
// zone,length
// m01:57
// m02:154
// m03:219
// m04:220
// m05:138
// m06:154
// m07:165
// m08:39
// m09:11
// m10:44
//                                       id serial PRIMARY KEY,
   //                                          address VARCHAR(100),
   //                                          lat DOUBLE precision,
   //                                          lng DOUBLE precision,
   //                                          mtgroup VARCHAR(100),
   //                                          mtlocation VARCHAR(100),
   //                                          wheelchair BOOLEAN,
   //                                          mtday VARCHAR(50),
   //                                          mtstart VARCHAR(50),
   //                                          mtend VARCHAR(50),
   //                                          mttype VARCHAR(100),
   //                                          mtspin TEXT,
   //                                          mtzone SMALLINT

//query array obj
//var thisQuery = "SELECT address, lat, lng, mtstart, mtend, mtgroup, mtspin, mtday, mtlocation, wheelchair, mtzone FROM aainfoAll WHERE mtstart = '1:00 PM' ";
//var thisQuery = "SELECT mtgroup, mtspin, mtzone, mtlocation, address, mttype FROM aainfo WHERE  'Women'= ANY(mtspin) ";



// var thisQuery = `SELECT lat,lng, mtlocation
//                     FROM aainfoAll
//                     WHERE  address = '141 HENRY ST New York NY ' `;



var thisQuery = `UPDATE aainfoAll
                    SET lat= 40.7843165,
                        lng= -73.956073
                        
                    WHERE  address = '1285 MADISON STATE ROAD NY AVE New York NY ' `;
                    
                    
// var secQuery = `SELECT lat,lng, mtlocation
//                     FROM aainfoAll
//                     WHERE  address = '5866 W 135TH ST New York NY ' `;
                    
                    

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        console.log(res);
        client.end();
    }
});

// client.query(secQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
//     client.end();
// });
