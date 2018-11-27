// npm install request
// mkdir data

//var async = require("async");

var request = require('request');
var fs = require('fs');

// Original Code

for (var i=1; i<11; i++){
    if (i<10){
        i='0'+i
        
    }
    function requiestMeeting(idx){
        var url= 'https://parsons.nyc/aa/m'+idx+'.html';
        var fn ='/home/ec2-user/environment/Week1/data2/m'+idx+'.txt';
        
        request(url, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    fs.writeFileSync(fn, body);
                }
                else {console.log("Request failed!")}
            
                
            });
     }
    requiestMeeting(i)
}