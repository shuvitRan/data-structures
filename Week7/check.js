var async = require('async'); // npm install async
var fs = require('fs');

var checkContent = fs.readFileSync("data/cleanData/M03CleanData.json");
var checke= JSON.parse(checkContent);

console.log(checke[1].latLon.Latitude);
