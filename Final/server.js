require('dotenv').config({ path: '../.env' });
var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'DanRan';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'danDB';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


// AWS DynamoDB credentials
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AK_IAM;
AWS.config.secretAccessKey = process.env.SAK_IAM;
AWS.config.region = "us-east-2";


app.get('/ss', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var q = ` 
               
                SELECT  derivedTable.sensorTime
                FROM (
                    SELECT 
                        sensorValue, sensorTime,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime) AS pSensorValue,
                        LAG(sensorValue, 1, '0') OVER (ORDER BY sensorTime DESC) AS aSensorValue 
                    FROM sensorData
                ) AS derivedTable
                WHERE (sensorValue='1' AND pSensorValue='0') or (sensorValue='1' AND aSensorValue='0')
                union all  
                SELECT  derivedTable.sensorTime
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

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            var resp =JSON.stringify(qres.rows); 
            res.send(resp);
            client.end();
            console.log('1) responded to request for sensor graph');
             //console.log(resp);
        }
    });
});


// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});