var diaryEntries = [];

require('dotenv').config({ path: '../.env' });
var async = require('async');

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AK_IAM;
AWS.config.secretAccessKey = process.env.SAK_IAM;
AWS.config.region = "us-east-2";

class DiaryEntry {
    
   
    
    
  constructor(primaryKey, randomNote, happy, sketch) {
    let date = new Date(Date.now());
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {}; 
    this.date.S = date.toLocaleDateString( 'en-US',options).toString();
    this.randomNote = {};
    this.randomNote.S = randomNote;
    this.happy = {};
    this.happy.BOOL = happy; 
    if (sketch != null) {
     this.sketch = {};
     this.sketch.SS = sketch; 
    }
    this.month = {};
    //	Get the month as a number (0-11)
    this.month.N = new Date().getMonth().toString();
  }
}

diaryEntries.push(new DiaryEntry(0, "Sketch therapy", true, ["tesing URL", "testingURL2"]));
diaryEntries.push(new DiaryEntry(1, "Second Sketh", true, ["testingURL","testingURL2","testingURL3"]));
diaryEntries.push(new DiaryEntry(2, "Third Sketh", true, ["testingURL","testingURL2","testingURL4"]));

console.log(diaryEntries[1].pk.N);

//console.log(process.env.SAK_IAM)

 var dynamodb = new AWS.DynamoDB();

// var params = {};
// params.Item = diaryEntries[0]; 
// params.TableName = "SketchTherapy";

// dynamodb.putItem(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


//loop and insert each of item.

async.eachSeries(diaryEntries, function(value, callback) {
  
  var params = {};
params.Item = value; 
params.TableName = "SketchTherapy";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
   
  console.log('insert'+ value.pk.N)
    setTimeout(callback, 1000); 
}); 