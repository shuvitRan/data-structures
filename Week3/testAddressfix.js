// Sample addresss fix

// var x = '50 Perry Street, Ground Floor,';

// var x2 = x.substring(0, x.indexOf(','));

// var x3 = x2 + ', New York, NY';

// var x4 = x3.split(' ').join('+');

// console.log(x4);
//**************************

require('dotenv').config()
var fs=require('fs');


//var cheerio = require('cheerio');
//var stringified = JSON.stringify(content);


//***********************************************
// After some testing I found out that\\
//189th Street &amp; Bennett Avenue )= is a wrong address, it is actually :178 Bennett Ave, New York, NY 10040
var content = fs.readFileSync("data/AAInfo.json");

var data=JSON.parse(content);

console.log(data[19]);

data[19]='178 Bennett Avenue';

console.log(data);

fs.writeFileSync('data/AAInfoFix.json', JSON.stringify(data));
