var diarydata=[{"noteOfSketch":{"SS":["tree study with color"]},"dt":{"N":"1540684800000"},"date":{"S":"Sun Oct 28 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_28_2018.jpg"]},"typeOfSketch":{"S":"digital"}},{"noteOfSketch":{"SS":["dog and girl"]},"dt":{"N":"1540944000000"},"date":{"S":"Wed Oct 31 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_31_2018DogandGirl.jpg"]},"typeOfSketch":{"S":"digital"}},{"noteOfSketch":{"SS":["hourse study"]},"dt":{"N":"1541116800000"},"date":{"S":"Fri Nov 02 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Nov_2_2018hourseStudy.jpg"]},"typeOfSketch":{"S":"digital"}},{"noteOfSketch":{"SS":["figure study"]},"dt":{"N":"1541203200000"},"date":{"S":"Sat Nov 03 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Nov_3_2018budystudy1.jpg"]},"typeOfSketch":{"S":"digital"}},{"noteOfSketch":{"SS":["figure study"]},"dt":{"N":"1541548800000"},"date":{"S":"Wed Nov 07 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Nov_7_2018budystudy2.jpg"]},"typeOfSketch":{"S":"digital"}},{"noteOfSketch":{"SS":["girl with color"]},"dt":{"N":"1541721600000"},"date":{"S":"Fri Nov 09 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Nov_9_2018.jpg"]},"typeOfSketch":{"S":"digital"}},{"noteOfSketch":{"SS":["cat study sketch"]},"dt":{"N":"1541808000000"},"date":{"S":"Sat Nov 10 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Nov_10_2018.jpg"]},"typeOfSketch":{"S":"digital"}}];


var diarydata2=[{"noteOfSketch":{"SS":["figure study"]},"dt":{"N":"1539475200000"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/0ct_14_2018.jpg"]},"date":{"S":"Sun Oct 14 2018"},"typeOfSketch":{"S":"pencil"}},{"noteOfSketch":{"SS":["Storyboard Study","Storyboard Study 2"]},"dt":{"N":"1539820800000"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_18_2018.jpg","https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_18_2018_2.jpg"]},"date":{"S":"Thu Oct 18 2018"},"typeOfSketch":{"S":"pencil"}},{"noteOfSketch":{"SS":["storyboard for scar 1"]},"dt":{"N":"1540339200000"},"date":{"S":"Wed Oct 24 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_24_2018.jpg"]},"typeOfSketch":{"S":"pencil"}},{"noteOfSketch":{"SS":["storyboard for scar 2"]},"dt":{"N":"1540512000000"},"date":{"S":"Fri Oct 26 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_26_2018.jpg"]},"typeOfSketch":{"S":"pencil"}},{"noteOfSketch":{"SS":["storyboard for scar 3"]},"dt":{"N":"1540598400000"},"date":{"S":"Sat Oct 27 2018"},"sketch":{"SS":["https://raw.githubusercontent.com/BounceRan/SketchTherapy/master/Sketch/Oct_27_2018.jpg"]},"typeOfSketch":{"S":"pencil"}}];
// loopthroughData(diarydata);

// function changeData(callback){
//
//   var el=document.getElementById("imagelist");
//   while (el.hasChildNodes()) {
//   el.removeChild(el.firstChild);
// }
//
//   callback();
// }

const button1 = document.getElementById('digital');
button1.addEventListener('click', function(e) {

fetch('/digital', {method: 'GET'})
   .then(function(response) {
     if(response.ok) {
     //  console.log('click was recorded');
       return response.json();
     }
     throw new Error('Request failed.');
   })
   .then((data)=>{
     //console.log(data);
     loopthroughData(data);
   })
   .catch(function(error) {
     console.log(error);
   });
});


const button2 = document.getElementById('pencil');
button2.addEventListener('click', function(e) {

fetch('/pencil', {method: 'GET'})
   .then(function(response) {
     if(response.ok) {
       return response.json();
     }
     throw new Error('Request failed.');
   })
   .then((data)=>{
     //console.log(data);
     loopthroughData(data);
   })
   .catch(function(error) {
     console.log(error);
   });
});
const button3 = document.getElementById('pen');
button3.addEventListener('click', function(e) {

fetch('/pen', {method: 'GET'})
   .then(function(response) {
     if(response.ok) {

       return response.json();
     }
     throw new Error('Request failed.');
   })
   .then((data)=>{
    // console.log(data);
     loopthroughData(data);
   })
   .catch(function(error) {
     console.log(error);
   });
});


fetch('/digital', {method: 'GET'})
   .then(function(response) {
     if(response.ok) {
       return response.json();
     }
     throw new Error('Request failed.');
   })
   .then((data)=>{
    // console.log(data);
     loopthroughData(data);
   })
   .catch(function(error) {
     console.log(error);
   });


//loopthroughData(diarydata);


function loopthroughData(insertdata){

  var data=[]
//data=insertdata.reverse();
  data=insertdata.sort(function(a,b){return new Date(b.date.S) - new Date( a.date.S)})

  var el=document.getElementById("imagelist");
  while (el.hasChildNodes()) {
  el.removeChild(el.firstChild);
}



//console.log(data);

for (var i=0 ; i<data.length ; i++){
  for(var a=0; a<data[i].sketch.SS.length; a++){
    //console.log(data[i].sketch.SS[a]);
    var src= document.getElementById("imagelist");
    var group=document.createElement('div');
    var textG=document.createElement('div');
    var img=document.createElement('img');
    var describe=document.createElement('p1');
    var type=document.createElement('p');
    img.src=data[i].sketch.SS[a];
    //type=document.createElement('p');//.className="type";
    type.setAttribute("class","sktype");
    describe.innerHTML=data[i].noteOfSketch.SS[a]+" <br> "+data[i].date.S ;
    type.innerHTML= " Type: " +data[i].typeOfSketch.S;
    src.appendChild(group);
    group.setAttribute("class","imgGroup");
    textG.setAttribute("class","textG");
    group.appendChild(img);
    group.appendChild(textG);
    textG.appendChild(describe);
    textG.appendChild(type);

    };
  };


//img


};
