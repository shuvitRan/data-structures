// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/zonehtml/m06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var mtdata =   fs.readFileSync('data/M06CleanData.json');
var mZone = JSON.parse(mtdata);
//var mZone= new Object();


var meetingData=[];



//Group
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(function(i, elem) {
   //if($(this).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){   //if use this if statement there will be a system erro for phase json.
// var group= $(elem).find('b').text().trim().replace(/(?<! )-/g,' ').replace(/\s\s/g,'').split('-')[0].trim() ;
 var group= $(elem).find('b').text().trim().split(" -")[0].replace(/\s\s/g,'').replace(/-/g,' ').trim().replace(/'/g,"''"); 
        //console.log(group);
        mZone[i].group = group;
    }
//}
    );


//wheelchair
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(function(i,elem){
    //var wheelChair= $(elem).find('span').text().trim();
    var wheelChair = $(elem).find('span').html(); // find span element
    if (wheelChair == null) {
      mZone[i].wheelchair = false;
    } else {
      mZone[i].wheelchair = true;
    }
  });

//location
$('h4[style="margin:0;padding:0;"]').each(function(i,elem){
    //var locationName = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').replace('&apos;','\'').trim();
   var locationName=  $(elem).text().trim().replace(/'/g,"''");
   //console.log(locationName)
   if( locationName !=''){
       mZone[i].mtlocation=locationName;
       
   }else{
        mZone[i].mtlocation=null;
   }
    
  });

//Meeting Date (mon-sun)
$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(function(i, elem) {
    var mtdate=$(elem).find('b').text().replace(/Type/g,'').replace(/FromtoMeeting/g,'').replace(/Interest/g,'').replace(/Special/g,'').replace(/s /g,'').replace(/\s\s/g,' ').trim();
        var date_array = mtdate.split(' ');
        //console.log(date_array);
         mZone[i].mtDate = date_array;
      
});

//Meeting Hour--
$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').split('<br> <br>');
    // remove empty lines and extra spaces and split each day
    
    var start=[];
    var end=[];
    for (var j=0; j<sections.length; j++){

      var st = sections[j].split('</b>')[1];
      var et = sections[j].split('</b>')[2];
      
      if (st != undefined && et != undefined){
        start.push(st.substring(1, st.indexOf(' <')));
        end.push(et.substring(1, et.indexOf(' <')));
        // console.log(sec);
      }
    }
    // console.log(start);
    // console.log(end);
    // add each time schedule as a json object to the array
    mZone[i].start = start;
    mZone[i].end = end;
  }
);

// type $ special interest
 $('td[style="border-bottom\\:1px solid #e3e3e3;width\\:350px;"]').each(function(i,elem){
    // var typeonly = $(this).text().trim().replace(/\A*.*Type /g, '').replace(/=\\?.*/g, '').replace(/\s+/g,' ').trim().split(" ");
    var sections = $(this).text().trim().replace(/\A*.*Meeting /g, '').split(/\s\s+/g)//.replace(/=\\?.*/g, '')//.trim().split(" ");
        var typeofAA=[];
        var specialIn=[];
       var tpStr = "Type";
        var spStr = "Special Interest";
            for (var j=0; j< sections.length; j++){
                if (sections[j].includes(tpStr)){
                typeofAA.push(sections[j].replace(/\A*.*Type /g, '').replace(/=\\?.*/g, '').trim());
                }else {
                    typeofAA.push('null')
                }
                if (sections[j].includes(spStr)){
                     specialIn.push(sections[j].replace(/\A*.*Special Interest /g, ''));
                }else{
                    specialIn.push('null')
                    }
        }
     //console.log(sections);
    //  console.log(typeofAA)
     mZone[i].type = typeofAA;
      mZone[i].spinterest = specialIn;
 });

for (var i=0; i<mZone.length; i++){
  mZone[i].zone = 6;
  //delete mZone[i].location;
}


console.log(mZone);
console.log(mZone.length);

fs.writeFileSync('data/M06CleanData.json', JSON.stringify(mZone));
