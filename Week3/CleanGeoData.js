require('dotenv').config()
var fs=require('fs');
var async = require('async'); 

var content = fs.readFileSync("data/M10GeoData.json");

var data=JSON.parse(content);

var cleanData=[];
var AAinput='';
console.log(data.length);
console.log(data[0].InputAddress.StreetAddress);
console.log(data[21].OutputGeocodes[0].OutputGeocode.Latitude);
console.log(data[21].OutputGeocodes[0].OutputGeocode.Longitude);
data.forEach(function(value) {
    
    AAinput ={'address': value.InputAddress.StreetAddress
    , 'latLong':{'Lat':+value.OutputGeocodes[0].OutputGeocode.Latitude
    , 'Lng':+value.OutputGeocodes[0].OutputGeocode.Longitude}};
    
    
    
    //AAinput+= , 'latLong':{'Lat':+value.OutputGeocodes[0].OutputGeocode.Latitude
   // AAinput+= , 'Lng':+value.OutputGeocodes[0].OutputGeocode.Longitude}};
    
    cleanData.push(AAinput);
    
    //setTimeout(callback, 50);
});


console.log(cleanData);
fs.writeFileSync('data/M10CleanData.json', JSON.stringify(cleanData));
console.log(JSON.stringify(cleanData));