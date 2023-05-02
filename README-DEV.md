# Configuring Your Local Environment

Please follow these instructions:

1. Create an AWS account
2. Navigate to the IAM service and click on "Users" in the sidebar
3. Add a new user (user access to AWS Management Console is not required)
4. Select Attach policies directly 
5. Add the "AssumeRolePolicy" from the available permission policy options
6. Create the new user
7. Within the user, navigate to Security Credentials and select Create Access Key
8. Select Application Running Outside AWS
9. Create the new Access key
WARNING: Save the secret access key provided upon creation, as you will not be able to access this again.
10. Create a .env in the root directory of the app and store the your keys under accessKeyId and secretAccessKey
*If using Docker, add to docker-compose.yaml*
11. Add the ARN from your newly created user to the WatchdogsTemplate
12. Create an S3 Bucket, turn OFF block all public access
13. Upload your template to the S3 Bucket and copy the ARN to the newly uplaoded template 
14. Navigate to Permissions for the S3 Bucket and click "Edit" under "Bucket Policy"
15. Paste in the following code, replacing the "Resource" value with the ARN from your template

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

17. Copy and paste the URL below into the href on line 127 of Signup.tsx, replacing your region, template url, and stack name.

https://YOUR_REGION.console.aws.amazon.com/cloudformation/home?region=YOUR_REGION#/stacks/quickcreate?templateURL=TEMPLATE_URL&stackName=STACK_NAME

MONGODB SERVER
Create a key in your .env file with a key of mongoKey and value of your MongoDB database URL.
*If using Docker, add to docker-compose.yml*
