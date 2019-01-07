
var sensordata=[ {sensortime: "2018-11-18T18:50:49.947Z"},{sensortime: "2018-11-18T18:52:50.059Z"}] ;
       
var startTime=[], endTime=[];
var dayinfo=[], yearinfo=[];
var daytimeStart=[], daytimeEnd=[];
var periodGroup =[];
var forday, testp;
var totalMin=[]

//var sketch= function (p) {
//  p.setup= function(){

// seperatedata();
// getDay();

//boolean for draw working on right time
var state= false;
//console.log('dothings')

function setup(){
 console.log("hello");
 //fetch talk to the server loading data and wait for it complete
   let promise = fetch('/ss', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      //document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
       return sensordata=data;
      console.log("first");
      //console.log(data);
    
      })
      .then(function(sensordata){
        //console.log(sensordata);
        seperatedata();
      getDay();
        
      })
      .then(function(){
        console.log("third");
      
         //loadJOSN()

  createCanvas(windowWidth,(dayinfo.length+1)*30+100);


forday= new lineForDay();

testp= new lineForPeriod(0,0);


var index=0;
var tempDay=0;

for(var a =0 ; a<daytimeStart.length;a++){
  
  var minuteOneDay=0;
  for (var i=0; i< startTime.length; i++){
      if(startTime[i]>daytimeStart[a] && endTime[i]<daytimeEnd[a]){
          minuteOneDay+=moment.duration(endTime[i].diff(startTime[i])).asHours();

        if(index<startTime.length){
          periodGroup[index++]= new lineForPeriod(i,a);
          console.log(startTime.length);
          
        }
      }

  }
  totalMin.push(minuteOneDay);
};


countAvHours();
        
      })
      .then(function(){
        
        state=true;
      }).catch(err=> console.log(err));
      
    //  console.log(promise);
 //setTimeout(3000);

};
//};



 function draw(){
   
if(state== true){
background('#e4dfdf');
forday.display();
  //testp.display();

//if(sensordata>5){
      for (var i=0; i<periodGroup.length;i++){
        periodGroup[i].display();
  //  }
}
}

};






function countAvHours(){
  let totalH=0
  for(var i=0; i<totalMin.length; i++){
        totalH+=totalMin[i];
  }
  let dayCount=totalMin.length;

  let avHour= totalH/totalMin.length;
  // strokeWeight(0);
  // textSize(12);
  // fill(80,80,80);
  //textAlign(LEFT);
  textInfo= "There are <span id='highlight'>"+dayCount+"</span> days of records, and the average sitting time are <span id='highlight'>" + avHour.toFixed(1)+"</span> hr perday.";

  var div = document.getElementById('infoText');

  div.innerHTML += textInfo;

}



//seperate the data to start and end, put them into two array
function seperatedata(){
  for(var i=0; i < sensordata.length; i++ ){
    if( i%2 == 0){
        startTime.push(moment(sensordata[i].sensortime).add(5, 'hour'));

      }else {
        endTime.push(moment(sensordata[i].sensortime).add(5,'hour'));
      }
  }

}







//function which get how many day I have.
function getDay(){
 var currentday=0, previousDay=0;


for(var i=0; i < startTime.length; i++ ){

  currentday = moment(startTime[i]).dayOfYear();
  previousDay = moment(startTime[i-1]).dayOfYear();

    if(currentday!=previousDay){
     yearinfo.push(moment(startTime[i]).year());
      dayinfo.push(moment(startTime[i]).dayOfYear());
    }
}
 //console.log(dayinfo);

}


//this function and class create the line for each sitting period
function lineForPeriod(startt,dayY){

  var x1=map(Number(startTime[startt]-daytimeStart[dayY]), 0 , daytimeEnd[dayY]-daytimeStart[dayY], 0.1*windowWidth,(windowWidth-0.1*windowWidth));
  var x2=map(Number(endTime[startt]-daytimeStart[dayY]), 0 , daytimeEnd[dayY]-daytimeStart[dayY], 0.1*windowWidth,(windowWidth-0.1*windowWidth));



  //var x3= map(50, 0,100, 0, 10);
 // console.log(sX+'and'+ eX);
 var yheight=windowHeight;

this.display=function(){


//console.log(mouseY);

strokeWeight(5);
stroke(45,40,40);
line(x1,0.1*yheight+dayY*30,x2,0.1*yheight+dayY*30);

if(mouseY> 0.1*yheight+dayY*30-10&& mouseY<0.1*yheight+dayY*30+10){

stroke('#f20247');
line(x1,0.1*yheight+dayY*30,x2,0.1*yheight+dayY*30);

  };
};


};




// day line class ,generate the day line according to the existing day
function lineForDay(){

for (var i=0; i<dayinfo.length; i++){
daytimeStart.push( moment().dayOfYear(dayinfo[i]).set({'year': yearinfo[i],'hour': 6, 'minute':0,'second':0}));
daytimeEnd.push( moment().dayOfYear(dayinfo[i]).set({'year': yearinfo[i],'hour': 6, 'minute':0,'second':0}).add(1,'day'))
}
//console.log(dayinfo.length);
// console.log(daytimeEnd);
// console.log(daytimeEnd[3]-daytimeStart[3]);
// console.log(startTime[0]-daytimeStart[0]);
// console.log(endTime[0]-daytimeStart[0]);
for(var i=0 ; i<daytimeStart,length; i++){
   daytimeStart[i];

}
// var sX=(0.1*windowWidth);
// var eX=(windowWidth-0.1*windowWidth);

  // this.x1 = x1;
  // this.y1 = y1;
  // this.x2 = x2;
  // this.y2 = y2;
  //
let x= windowWidth;
let y= windowHeight;

  this.display = function(){
    textSize(13);
    fill(20,25,30);
      strokeWeight(0);
        text(moment(daytimeStart[0]).format('LT') ,0.1*x,0.1*y-13);
        text(moment(daytimeEnd[0]).format('LT') ,(x-0.1*x),0.1*y-13);
        text(moment(daytimeStart[0]).add(12,'hour').format('LT'),(x/2),0.1*y-13);
        text(moment(daytimeStart[0]).add(6,'hour').format('LT'),(x/2+.1*x)/2,0.1*y-13);
        text(moment(daytimeStart[0]).add(18,'hour').format('LT'),((x/2-0.1*x)/2+(x/2)),0.1*y-13);
  //   line(this.x1, this.y1, this.x2, this.y2);
  for (var i=0; i<daytimeStart.length;i++){
    strokeWeight(5);
    textSize(10);
    stroke(150,150,150);
    line(0.1*x,0.1*y+i*30, (x-0.1*x), 0.1*y+i*30);

    strokeWeight(0);


    if(mouseY> 0.1*y+i*30-10&& mouseY<0.1*y+i*30+10){
      textSize(15);
      fill('#f20247');
      text(moment(daytimeStart[i]).format('ll, ddd') ,0.04*x,0.1*y+i*30+14);
      text(moment(daytimeEnd[i]).format('ll, ddd') ,(x-0.14*x),0.1*y+i*30+14);
    text((totalMin[i]).toFixed(1)+" hours" ,(0.5*x),0.1*y+i*30+15);
  }else{
      fill(100, 110, 114);
    textSize(12);
    text(moment(daytimeStart[i]).format('ll, ddd') ,0.04*x,0.1*y+i*30+14);
    text(moment(daytimeEnd[i]).format('ll, ddd') ,(x-0.14*x),0.1*y+i*30+14);

  }

  }
 }
};


  