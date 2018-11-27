var fs=require('fs');

var content = fs.readFileSync("AAInfo.json");

var data=JSON.parse(content);

console.log(data);