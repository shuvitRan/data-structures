require('dotenv').config();
const { Client } = require('pg');
var async = require('async');
var fs=require('fs');
var content = fs.readFileSync("data/M10CleanData.json");

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'DanRan';
db_credentials.host = 'mydbinstance.csyaktpfvlzf.us-east-2.rds.amazonaws.com';
db_credentials.database = 'danDB';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//var addressesForDb = [ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];
var addressesForDb = JSON.parse(content);


async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations (address,lat, long) VALUES (E'" + value.address + "', " + value.latLong.Lat + ", " + value.latLong.Lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 