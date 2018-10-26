// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var meetingData=[];

// print (to the console) names of thesis students
$('td').each(function(i, elem) {
    if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
    
    //console.log($(elem).html().split('<br>')[1]);
    //console.log($(elem).html().split('<br>')[2].trim().split(',')[0]);;
    

    // console.log('*************')
    
    
    meetingData.push($(elem).html().split('<br>')[2].trim().split(',')[0].split('@')[0].split('.')[0]);
    
    
   // meetingData+= ($(elem).html().split('<br>')[2].trim().split(',')[0]+ '\n');
    }
});
console.log(meetingData.length)
console.log(meetingData)

//fix address for zone 06
for (var i =0 ; i<meetingData.length; i++){
    
    if(meetingData[i].includes('Central Park West &amp; 76th Street - basement gymnasium')){
        
        meetingData.splice(i, 1, '344 Amsterdam Ave')
    }
    
}
console.log(meetingData.length)
console.log(meetingData)
fs.writeFileSync('data/06AAInfo.json', JSON.stringify(meetingData));
