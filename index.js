var aws = require('aws-sdk');  
const zlib = require('zlib');  
exports.handler = (event, context, callback) => {  
    const payload = Buffer.from(event.awslogs.data, 'base64');
    zlib.gunzip(payload, (err, res) => {
        if (err) {
            return callback(err);
        }
        const parsed = JSON.parse(res.toString('utf8'));  
        for (var i=0; i<parsed['logEvents'].length; i++){
        parsed1 =parsed['logEvents'][i]['message'];
        const parsedfinal = JSON.parse(parsed1.toString('utf8'));
        console.log('Decoded final in:',parsedfinal);
}
 const parsedfinal = JSON.parse(parsed1.toString('utf8'));
 console.log('Decoded final out:',parsedfinal);
 var creationDate = "";
 var userName = parsedfinal.userIdentity.type; 
 var instancesSet = parsedfinal.responseElements.instancesSet;
 console.log("instancesSet", instancesSet);
 console.log("userName", userName);  
 var eventName = parsedfinal['eventName'];
 var eventTime = parsedfinal['eventTime'];
 var awsRegion = parsedfinal['awsRegion'];
 if(eventName === "RunInstances")
 {
      for (var j=0; j<instancesSet.items.length; j++){
           instanceId = instancesSet['items'][j]['instanceId'];
           instanceType  = instancesSet['items'][j]['instanceType'];
           console.log("instanceId", instanceId);         
           console.log("instanceType", instanceType);
       }
      ddb = new aws.DynamoDB({params: {TableName: 'instance-start-state'}});    
 var itemParams = {Item: {Id: {S: instanceId} ,Region: {S: awsRegion},userName: {S: userName},instanceType: {S: instanceType},eventName: {S: eventName},creationDate: {S: eventTime} }};
 ddb.putItem(itemParams, function(err, data)
{
  if(err) { context.fail(err)}

  else {
           console.log(data);
           context.succeed();
      }
  });
 }
 else if(eventName === "TerminateInstances")
 {
      for (var k=0; k<instancesSet.items.length; k++){
           instanceId = instancesSet['items'][k]['instanceId'];
           console.log("instanceId", instanceId);
       }
      ddb1 = new aws.DynamoDB({params: {TableName: 'instance-terminate-state'}});    
  var itemParams1 = {Item: {Id: {S: instanceId} ,Region: {S: awsRegion},userName: {S: userName},eventName: {S: eventName},creationDate: {S: eventTime} }};    
  ddb1.putItem(itemParams1, function(err, data)
{
  if(err) { context.fail(err)}

  else {
           console.log(data);
           context.succeed();
      }
  });
 }
  callback(null, `Successfully processed ${parsed.logEvents.length} log events.`);
    });
};
