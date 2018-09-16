
//Dan Ran --Week 1 Assignment 
// npm install request
// mkdir data

//var async = require("async");

var request = require('request');
var fs = require('fs');



var Hnumber ;
var i=1;

//print out the right page number in 01,02-10
function PageNumber(Number){
    return (Number<10?'0':'')+Number
    
}



//Testing async/await --------------------

// function FindPages(){
    
    
//             request('https://parsons.nyc/aa/m'+ Hnumber +'.html', function(error, response, body){
//                 if (!error && response.statusCode == 200) {
//                     fs.writeFileSync('/home/ec2-user/environment/data/m'+ Hnumber +'.txt', body);
                    
                     
//                 }
//                 else {console.log("Request failed!")}
               
//             });
     
    
// }


// async function RunPrograme() {
   

//         for (i=1;i<11; i++){
            
            
            
         
//           Hnumber= PageNumber(i);
          
//         await FindPages();
        
        
//          }
         
// }

// RunPrograme();

//Function With Delay ---------------------------------------
function DelayLoop(){
    
    
   //request the Ten pages with delay. waiting for each page go though      
 setTimeout(
      function () {    
             
                        
      if (i < 11) {   
            Hnumber=PageNumber(i);
             i++; 
             
            //call it self again with i+1         
            DelayLoop();             
            console.log(Hnumber);
              
            request('https://parsons.nyc/aa/m'+ Hnumber +'.html', function(error, response, body){
            if (!error && response.statusCode == 200) {
                fs.writeFileSync('/home/ec2-user/environment/Week1/data/m'+ Hnumber +'.txt', body);
            }
            else {console.log("Request failed!")}
           
            });
         
      }                     
    }, 200) 
}
        
DelayLoop();





// Original Code

// request('https://parsons.nyc/aa/m'+Hnumber+'.html', function(error, response, body){
//     if (!error && response.statusCode == 200) {
//         fs.writeFileSync('/home/ec2-user/environment/data/m'+Hnumber+'.txt', body);
//     }
//     else {console.log("Request failed!")}

    
// });