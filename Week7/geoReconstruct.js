require('dotenv').config();
var fs=require('fs');
var async = require('async'); 

var content = fs.readFileSync("data/FinalData/M10CleanData.json");

var data=JSON.parse(content);

var reconstructData=[];
var AAinput='';
console.log(data.length);
console.log(data[1]);
//console.log(data[21].OutputGeocodes[0].OutputGeocode.Latitude);
//console.log(data[21].OutputGeocodes[0].OutputGeocode.Longitude);
 data.forEach(function(value) {
    
    // AAinput ={'address': value.streetAddress
    // , 'latLong':{'Lat':+value.lat
    // , 'Lng':+value.long}};
    
    //simpleer no latlong nest
    //     AAinput ={'address': value.InputAddress.StreetAddress
    // , 'Lat':+value.OutputGeocodes[0].OutputGeocode.Latitude
    // , 'Lng':+value.OutputGeocodes[0].OutputGeocode.Longitude};
    
    
    //AAinput+= , 'latLong':{'Lat':+value.OutputGeocodes[0].OutputGeocode.Latitude
   // AAinput+= , 'Lng':+value.OutputGeocodes[0].OutputGeocode.Longitude}};
    
   // reconstructData.push(AAinput);
    
   // setTimeout(callback, 50);
});


for (var i=0; i<data.length; i++){
 // data[i].zone = 2;
  //delete mZone[i].location;
}


//console.log(data);
//fs.writeFileSync('data/M02CleanData.json', JSON.stringify(data));
//console.log(JSON.stringify(reconstructData));