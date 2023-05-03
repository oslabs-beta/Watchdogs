# Configuring Your Local Environment

Please follow these instructions:

1. Create an AWS account
2. Navigate to the IAM service and click on "Policies" in the sidebar
3. Create a new policy > Service: STS > Action: Write/AssumeRole > Resources: All resources
4. Navigate to the IAM service and click on "Users" in the sidebar
5. Add a new user (user access to AWS Management Console is not required)
6. Select Attach policies directly and attach the created policy
7. Create the new user
8. Within the user, navigate to Security Credentials and select Create Access Key
9. Select Application Running Outside AWS
10. Create the new Access key
   WARNING: Save the secret access key provided upon creation, as you will not be able to access this again.
11. Create a .env in the root directory of the app and store your keys under accessKeyId and secretAccessKey
    _If using Docker, add to docker-compose.yaml_
12. Add the ARN from your newly created user to the WatchdogsTemplate
13. Create an S3 Bucket, turn OFF block all public access
14. Upload your template to the S3 Bucket and copy the ARN to the newly uplaoded template
15. Navigate to Permissions for the S3 Bucket and click "Edit" under "Bucket Policy"
16. Paste in the following code, replacing the "Resource" value with the ARN from your template

<code>

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadForGetBucketObjects",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": " YOUR TEMPLATE ARN"
            }
        ]
    }

</code>

17. Copy and paste the URL below into the href on line 127 of client > Components > Signup.tsx, replacing your region, template url, and stack name(whatever you want it to be).

https://YOUR_REGION.console.aws.amazon.com/cloudformation/home?region=YOUR_REGION#/stacks/quickcreate?templateURL=TEMPLATE_URL&stackName=STACK_NAME

MONGODB SERVER
Create a key in your .env file with a key of mongoKey and value of your MongoDB database URL.
_If using Docker, add to docker-compose.yml_
