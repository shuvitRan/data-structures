var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var apiKey = process.env.TAMU_KEY; 

var meetingsData = [];
var addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            var thisGeo = {};
            //Use the info that needed
            thisGeo.lat=tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
            thisGeo.long=tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
            thisGeo.streetAddress=tamuGeo['InputAddress']['StreetAddress'];
            console.log(tamuGeo['FeatureMatchingResultType']);
            console.log(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'],['OutputGeocodes'][0]['OutputGeocode']['Longitude'] );
            meetingsData.push(thisGeo);
        }
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});