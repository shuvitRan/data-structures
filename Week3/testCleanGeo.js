var fs=require('fs');

var content= fs.readFileSync("data/M10CleanData.json");
var data=JSON.parse(content);

console.log(data.length);

console.log(data);