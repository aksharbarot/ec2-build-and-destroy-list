# ec2-build-and-destroy-list
This will help users to find over all deploy and deleted EC2

1. Enable CloudTrail Logs
2. Start CloudTrail logs to deliver to Cloudwatch
3. Create IAM Role for Lambda and DynamoDB (Provide Permission for Lambda and DyanamoDB access)
4. Create a Lambda Function to Store Data in DynamoDB (paste provided Code "index.js" in lambda function)
-Above step 4 will create 2 DynamoDB tables (instance-terminate-state and instance-terminate-stop)
