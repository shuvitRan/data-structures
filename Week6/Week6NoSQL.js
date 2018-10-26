// npm install aws-sdk

var AWS = require('aws-sdk');
require('dotenv').config({ path: '../.env' });

//AWS.config = new AWS.Config();
// AWS.config.accessKeyId = process.env.AK_IAM;
// AWS.config.secretAccessKey = process.env.SAK_IAM;

AWS.config.accessKeyId = process.env.AK_JU;
AWS.config.secretAccessKey = process.env.SK_JU;
//console.log(process.env.SK_JU)

// AWS.config.accessKeyId = process.env.RTAK ;
// AWS.config.secretAccessKey = process.RTSK;
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "SketchTherapy",
    KeyConditionExpression: "typeOfSketch = :typeName and dt between :minDate and :maxDate", // the query expression  
                                //你必须使用pk 来query你的table
    // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "topic"
    // },
    ExpressionAttributeValues: { // the query values
        ":typeName": {S: "pencil"},
        ":minDate": {N: new Date("October 10, 2018").valueOf().toString()},
        ":maxDate": {N: new Date("October 22, 2018").valueOf().toString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
            console.log("___________", new Date(Number(item.dt.N)).toDateString());
        });
    }
});

//console.log(process.env.AK_IAM);