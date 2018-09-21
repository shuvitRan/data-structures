// npm install cheerio
//const request=require("request");
var fs = require('fs');
var cheerio = require('cheerio');

const AAInfoCSV = fs.createWriteStream('data/AAinfo.csv');
//const AAInfoJson= fs.createWriteStream('data/AAinfo.json');

AAInfoCSV.write('LocationName,EventName,Address \n');
// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m10.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var AAinfo= '';
var AAinfoJ= '';
var keyValue=0;
// print (to the console) names of thesis students
$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
    //const item= $(elem).not('span').text();
    //find location name in original file
    const locationName= $(elem).find('h4').text();
    //find detail info in the file
    const detailInfo= $(elem).find('.detailsBox').text();
    //find event name in the file
    const eventName= $(elem).find('b').text();
    //remove other info except address 
    $(elem).find('h4').remove(); 
    $(elem).find('div').remove(); 
    $(elem).find('span').remove(); 
    $(elem).find('b').remove();
     console.log($(elem).get().length);
    //find the location address and take out the empty spaces with regex
    const LocationAddress= $(elem).text().replace(/\s\s+/g, '');
    
   //console.log(locationName +' | '+eventName +' | '+ LocationAddress);
    // save the info to a global var
     AAinfo+= (locationName +' | '+eventName +' | '+ LocationAddress)+'\n';
     
     // test on try save the info to a json format
     keyValue++;  //create a key for json file
    
     // still need to take out the last comma of last element in the AAInfo.json file 

      AAinfoJ+=(`\"${keyValue}\"\:\[ \"${locationName}\" \, \"${eventName}\" \,\"${LocationAddress}\" \]\,\n`);
     
     // write to a CSV file
     AAInfoCSV.write(`${locationName}, ${eventName}, ${LocationAddress} \n`);
  
});

// write to text file
 fs.writeFileSync('data/AAInfo.txt', AAinfo);
 fs.writeFileSync('data/AAInfo.json', '{' + '\n' + AAinfoJ+ '\n' +'}');

 console.log(AAinfoJ);
 
