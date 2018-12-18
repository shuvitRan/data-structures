require('dotenv').config({ path: '../.env' });
var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
var moment = require('moment-timezone');

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



//Sensor Data*****************
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


// respond to requests for /deardiary ****************
app.get('/digital', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
        TableName: "SketchTherapy",
        KeyConditionExpression: "#tp = :typeOfS and dt between :minDate and :maxDate",  // the query expression
        "Limit": 10 ,
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp": "typeOfSketch"
        },
        ExpressionAttributeValues: { // the query values
            ":typeOfS": { "S": "digital"},
            ":minDate": {N: new Date("October 10, 2018").valueOf().toString()},
            ":maxDate": {N: new Date("December 22, 2018").valueOf().toString()}
            // ":typeOfS": { "S": "pen"}
                
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

// respond to requests for /deardiary
app.get('/pencil', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
        TableName: "SketchTherapy",
        KeyConditionExpression: "#tp = :typeOfS", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp": "typeOfSketch"
        },
        "Limit": 10 ,
         ExpressionAttributeValues: { // the query values
             ":typeOfS": { "S": "pencil"} 
             
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


// respond to requests for /deardiary
app.get('/pen', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
        TableName: "SketchTherapy",
        KeyConditionExpression: "#tp = :typeOfS", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp": "typeOfSketch"
        },
        "Limit": 10 ,
        ExpressionAttributeValues: { // the query values
            ":typeOfS": { "S": "pen"}
            // ":typeOfS": { "S": "pen"}
                
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


//aa meeting------------------------------

app.get('/aainit', function(req, res) {
    
    
    
//check today's day    
var todayAA=moment().tz("America/New_York").format('dddd');//.utcOffset(5);//.format('dddd');//.day();
console.log(todayAA);
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = '${todayAA}' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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

app.get('/mon', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Monday' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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


app.get('/tues', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Tuesday'
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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



app.get('/wes', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Wednesday' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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



app.get('/thr', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Thursday' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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

app.get('/fri', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Friday' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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
app.get('/sat', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Saturday' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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
app.get('/sund', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query   
    var thisQuery = `SELECT address as mtgaddress,mtspin, mtlocation as location,wheelchair,
                    json_agg(json_build_object('day', mtday, 'timeStart', mtstart)) as meetings,
                    lat,lng
                
                 FROM aainfoAll 
                 WHERE mtday = 'Sunday' 
                 GROUP BY mtgaddress, location, mtspin, lat,lng,wheelchair
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

// serve static files in /public
//app.use(express.static('public'));
app.use(express.static('public' + '/'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});