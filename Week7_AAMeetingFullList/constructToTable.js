var async = require('async'); // npm install async
var fs = require('fs');

// Create First time csv
// const AAInfoCSV = fs.createWriteStream('data/cleanDataAll/aameetingAll.csv');
// AAInfoCSV.write('mtAddress, lat, lng, group, wheelchair, mtDay, start, end, type, spinterest, zone, mtlocation \n');

// const AAInfoCSV = fs.createReadStream('data/cleanDataAll/aameetingAll.csv');

var content = fs.readFileSync("data/cleanData/M09CleanData.json");
var aajson=JSON.parse(content);
//var checkContent = fs.readFileSync("data/cleanDataAll/aameetingAll.json");
//var check= JSON.parse(checkContent);
var newcontent= [];


//var naajson=JSON.parse(ncontent);



async.eachSeries(aajson, function(value, callback) {
     
        const address = value.address;
        const lat = value.latLon.Latitude; 
        const lng = value.latLon.Longitude;
        const group = value.group;
        const wheelchair= value.wheelchair;
        const zone = value.zone;
        const mtlocation = value.location;
        
        console.log(value.latLon.Latitude);
        
       for (var i=0; i < value.day.length; i ++){
             
               var thisAAdata = {};

                 const mtDay = value.day[i];
                 const start = value.start[i];
                 const end = value.end[i];
                 const type = value.type[i];
                 const spinterest= value.spinterest[i];
                 
                 thisAAdata.address= address;
                 thisAAdata.lat= lat;
                 thisAAdata.lng= lng;
                 thisAAdata.Group=group;
                 thisAAdata.wheelchair=wheelchair;
                 thisAAdata.zone=zone;
                 thisAAdata.mtlocation=mtlocation;
                 thisAAdata.mtDay=mtDay;
                 thisAAdata.start=start;
                 thisAAdata.end=end;
                 thisAAdata.type=type;
                 thisAAdata.spinterest=spinterest;
                
              
                 newcontent.push(thisAAdata);
                
                // only for first csv file 
                //  AAInfoCSV.write(`"${address}", ${lat}, ${lng} , "${group}", ${wheelchair},`+
                //  `"${mtDay}", "${start}", "${end}" ,"${type}", "${spinterest}",${zone}, "${mtlocation}"  \n`);   
                 
                 const csvfile = (`"${address}", ${lat}, ${lng} , "${group}", ${wheelchair},`+
                `"${mtDay}", "${start}", "${end}" ,"${type}", "${spinterest}",${zone}, "${mtlocation}"  \n`);  
                
                fs.appendFileSync('data/cleanDataAll/aameetingAll.csv', csvfile )
                 
                  console.log('*** *** *** DONE *** ***');
        }
   
   setTimeout(callback, 100);
  // callback;
      
},function(){
     fs.writeFileSync('data/cleanDataAll/aaAllm09.json', JSON.stringify(newcontent));
    // fs.appendFileSync('data/cleanDataAll/aameetingAll.json',  JSON.stringify(thisAAdata));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(newcontent.length);

});

 
