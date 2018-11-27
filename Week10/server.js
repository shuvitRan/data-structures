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
// console.log(process.env.AK_IAM);
//  console.log(process.env.SAK_IAM);
// AWS.config.accessKeyId = process.env.RTAK;
// AWS.config.secretAccessKey = process.RTSK;
//AWS.config.accessKeyId = process.env.AK_JU;
//AWS.config.secretAccessKey = process.env.SK_JU;

AWS.config.region = "us-east-2";



// respond to requests for /sensor
app.get('/sensor', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_sit
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1) responded to request for sensor data');
        }
    });
});

// respond to requests for /aameetings
app.get('/aameetings', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    var thisQuery = `SELECT address as mtgaddress, mtlocation as location, json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings
                 FROM aainfoAll 
                 WHERE mtzone = 1 
                 GROUP BY mtgaddress, location
                 ;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
        TableName: "SketchTherapy",
        KeyConditionExpression: "#tp = :typeOfS", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp": "typeOfSketch"
        },
        ExpressionAttributeValues: { // the query values
            ":typeOfS": { S: "digital" }
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            res.send(data.Items);
            console.log('3) responded to request for dear diary data');
        }
    });

});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});