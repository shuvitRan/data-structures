// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m07.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var section= [];

 $('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]').each(function(i,elem){
  // var sections = $(this).text().trim().replace(/\A*.*Meeting /g, '').split(/\s\s+/g)//.replace(/=\\?.*/g, '')//.trim().split(" ");
       var sections = $(this).text().replace(/\A*.*From /g, '').trim().split(/\s\s+/g)//.replace(/\A*.*Meeting /g, '').split(/\s\s+/g)//.replace(/=\\?.*/g, '')//.trim().split(" ");
       
       console.log(sections);
       
        var typeofAA=[];
        var specialIn=[];
        var thisGeo = {};
       var tpStr = "Type";
        var spStr = "Special Interest";
            for (var j=0; j< sections.length; j++){
                
                if (sections[j].includes(tpStr)){
                typeofAA.push(sections[j].replace(/\A*.*Type /g, '').replace(/=\\?.*/g, '').trim());
                
                }else {
                    typeofAA.push('null');
                  
                }
                if (sections[j].includes(spStr)){
                     specialIn.push(sections[j].replace(/\A*.*Special Interest /g, '').trim());
                }else{
                    specialIn.push('null');
                    }
        }
         
        thisGeo.type=typeofAA;
        thisGeo.sp=specialIn;
         section.push(thisGeo);
       // section.push(typeofAA);
    //    section.push(specialIn);
//       console.log(thisGeo.length)
// console.log(thisGeo)
 });

console.log(section)


//fs.writeFileSync('data/06AAInfo.json', JSON.stringify(meetingData));