# ec2-build-and-destroy-list
This will help users to find over all deploy and deleted EC2

1. Enable CloudTrail Logs
2. Start CloudTrail logs to deliver to Cloudwatch
3. Create IAM Role for Lambda and DynamoDB (Provide Permission for Lambda and DyanamoDB access)
4. Create a Lambda Function to Store Data in DynamoDB (paste provided Code "index.js" in lambda function)
5. Now we will stream the logs with Lambda (Create Lambda subscription filter)
- Choose Lambda function name
- Log format (Cloudtrail)
- Subscription filter pattern - optional { $.eventName = "RunInstances" || $.eventName = "TerminateInstances" }
- Finally create subscription
6. Create DynamoDB Tables
- instance-terminate-state
- instance-terminate-stop
7. Now deploy few test EC2 and delete those. EC2 will be populated in DynamoDB tables



