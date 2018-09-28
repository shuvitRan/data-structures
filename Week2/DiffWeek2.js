// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m10.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var meetingData=[];

// print (to the console) names of thesis students
$('td').each(function(i, elem) {
    if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
    
    //console.log($(elem).html().split('<br>')[1]);
    console.log($(elem).html().split('<br>')[2].trim().split(',')[0]);;
    

    // console.log('*************')
    
    
    meetingData.push($(elem).html().split('<br>')[2].trim().split(',')[0].split('@')[0]);
    
   // meetingData+= ($(elem).html().split('<br>')[2].trim().split(',')[0]+ '\n');
    }
});


fs.writeFileSync('data/AAInfo.txt', JSON.stringify(meetingData));
