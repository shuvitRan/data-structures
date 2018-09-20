// npm install cheerio
//const request=require("request");
var fs = require('fs');
var cheerio = require('cheerio');

const AAInfoCSV = fs.createWriteStream('data/AAinfo.csv');

AAInfoCSV.write('LocationName,EventName,Address \n');
// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m10.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var AAinfo= '';

// print (to the console) names of thesis students
$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
    //const item= $(elem).not('span').text();
    const locationName= $(elem).find('h4').text();
    const detailInfo= $(elem).find('.detailsBox').text();
    const eventName= $(elem).find('b').text();
    $(elem).find('h4').remove(); 
    $(elem).find('div').remove(); 
    $(elem).find('span').remove(); 
    $(elem).find('b').remove();
    const LocationAddress= $(elem).text().replace(/\s\s+/g, '');
    //console.log(locationName, detailInfo);
    console.log(locationName +' | '+eventName +' | '+ LocationAddress);
    
     AAinfo+= (locationName +' | '+eventName +' | '+ LocationAddress)+'\n';
     AAInfoCSV.write(`${locationName}, ${eventName}, ${LocationAddress} \n`);
     
    //  fs.writeFile('data/AAInfoTest.txt', `${locationName}, ${eventName}, ${LocationAddress} \n`,(err) => {
    //      if (err) throw err;
    //      console.log('The file has been saved!');
    //         });
            
   // AAInfoCSV.write( locationName, eventName, locationAdress '\n');
});

 fs.writeFileSync('data/AAInfo.txt', AAinfo);

// write the project titles to a text file
// var thesisTitles = ''; // this variable will hold the lines of text

// $('.project .title').each(function(i, elem) {
//     thesisTitles += ($(elem).text()) + '\n';
// });

 //fs.writeFileSync('data/thesisTitles.txt', thesisTitles);