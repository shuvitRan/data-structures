// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m10.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var m10data =   fs.readFileSync('data/M10CleanData.json');
var m10 = JSON.parse(m10data);



var meetingData=[];

// print (to the console) names of thesis students
$('td').each(function(i, elem) {
    if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
    
    //console.log($(elem).html().split('<br>')[1]);
    //console.log($(elem).html().split('<br>')[2].trim().split(',')[0]);;
    
    //const locationName= $(elem).find('h4').text().trim();
    //const group= $(elem).find('b').text().trim().replace(/(?<! )-/g,' ').split('-')[0];
    
   //********************************************************************
    //var wheelChair= $(elem).find('span').text().trim();
     
    //  var wheelchair = $(this).find('span').html();
    // if(wheelchair==null){
    //         m10[i].wheelchair =false;
    //     } else {
    //         m10[i].wheelchair = true ;
    //     }
        
        
   // m10[i].location=locationName;

    
  //console.log(locationName)
   
   
   
    //console.log(locationName)
    //console.log('********************')
    
    //location Address
   // meetingData.push($(elem).html().split('<br>')[2].trim().split(',')[0].split('@')[0]);
    
   // meetingData+= ($(elem).html().split('<br>')[2].trim().split(',')[0]+ '\n');
            }
    
    // if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3;width:350px;"){
         
        
        //var mtdate=$(elem).find('b').text().replace(/Type/g,'').replace(/FromtoMeeting/g,'').replace(/Interest/g,'').replace(/Special/g,'').replace(/s /g,'');
        
        //console.log(mtdate);
        
        
        //const mtdate=$(elem).remove('b').text().replace(/ From.*/g, '').replace(/s /g,'').trim();
        
        
       //const mtStartTime=$(elem).remove('b').text();
      // $(elem).find('b').remove();
      // const mtStartTime=$(elem).text();
      
       
       
         // console.log('********');
         // console.log(mtStartTime );
         
    // }
    
    
    
    
    
    
});


//Group
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(function(i, elem) {
   
   //if($(this).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){   //if use this if statement there will be a system erro for phase json.
        var group= $(elem).find('b').text().trim().replace(/(?<! )-/g,' ').replace(/\s\s/g,'').split('-')[0] ;
    
        console.log(group);
        m10[i].group = group;
        
    }
//}
    
    
    );


//wheelchair
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(function(i,elem){
    //var wheelChair= $(elem).find('span').text().trim();
    var wheelChair = $(elem).find('span').html(); // find span element
    if (wheelChair == null) {
      m10[i].wheelchair = false;
    } else {
      m10[i].wheelchair = true;
    }
    // add each wheelchair access as a json object to the array
  }
);

//location
$('h4[style="margin:0;padding:0;"]').each(function(i,elem){
   
    //var locationName = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').replace('&apos;','\'').trim();
    var locationName=  $(elem).text().trim();

    m10[i].location=locationName;
    // add each loaction as a json object to the array
  }
);









//console.log(m10);


//fs.writeFileSync('data/AAInfo.txt', JSON.stringify(meetingData));
