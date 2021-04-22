# Age UK Volunteer Platform

The volunteer platform establishes a central point for potential volunteers to register for volunteering opportunities offered by Age Uk.

The platform also provides those working at charity HQ with administrative oversight over all volunteers who are interested or actively involved in volunteering opportunities.

Individuals/admins working within a particular division are only authorised to view volunteers that are interested or active within their division.

Users are assigned one of the following roles

- Master Admin - can access all volunteer data across all divisions
- Division Manager - can access all volunteer data within a single division
- Volunteer - can only view data relating to themselves

## Overview

This is the primary server-side repository for the volunteer platform.  This repository is responsible for the deployment of the API and related cloud architecture for the administration services.

Shared application logic (i.e. Lambda Layers) are also deployed via this repository.

**This repository should be deployed first, prior to any other related sever side or front-end repositories**

This repo uses a CloudFormation script to create a API gateway and Lambda function to handle administration services.

## Pre-requisites

**An AWS Account**

[AWS - Getting Started](https://aws.amazon.com/getting-started/)

Note: An IAM user with full admin access is advised

**NodeJS (v12+) & NPM**

[Install NodeJs and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


**Typescript**

[Install Typescript](https://www.typescriptlang.org/download)

**AWS CLI**

[Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)


**Serverless Framework**

```bash
npm install -g serverless
```

**MailChimp/Mandrill Account & API Key**

Other transactional email software can be supported with minor code changes to *src/events.ts*

[Setting up a Mandrill API Key](https://www.inboundnow.com/how-to-get-your-mandrill-api-key/)

**Mandrill Template**

A mandrill template is required that require two variables HEADER and CONTENT

[Setting up Mandrill Templates](https://mailchimp.com/developer/transactional/docs/templates-dynamic-content/)

## Deployment & Installation

**Create AWS EC2 Key Pair**

An EC2 key pair will be required to connect the volunteer platform DB.  Navigate to **Services** > **EC2** > **Key Pair** > **Create Key Pair** and download the key.

**Deploy Package Layer**

Prior to commencing deployment of the application, the following AWS Lambda package layer should be deployed to your AWS account.

[Download Volunteer Platform Package Layer](https://volunteer-platform-lambda-layer.s3.eu-west-2.amazonaws.com/nodejs.zip)

To install download the ZIP above and then login to AWS.  Navigate to **Services** > **Lambda** > **Layers** > **Create Layer**

Take a note of the ARN associated with the new layer once it has been uploaded e.g.

*arn:aws:lambda:eu-west-2:200000000000:layer:AukVolNodeJs:1*

**Setup .env file**

Rename (or copy) .env.example to .env.dev

Set the following keys

 - DATABASE_NAME=(desired DB name)
 - DATABASE_USER=(desired db user name)
 - DATABASE_PASSWORD=(desired db password)
 - S3_BUCKET_NAME=(unique S3 bucket name for admin front end)
 - MANDRILL_API_KEY=(your Mandrill API Key)
 - MANDRILL_TEMPLATE=(name of your Mandrill template)
 - VOLNODEJS_LAYER_ARN=(package layer ARN discussed above)

**Run Cloudformation Script**

The serverless.yml file contains a cloudformation script that will deploy the majority if the cloud architecture.  Run the following:

```bash
sls deploy --region eu-west-2 --stage dev
```

Once the script has run successfully populate the following keys in .env.dev and then re-deploy using the command above.

 - DATABASE_HOST=(the deployed endpoint for your RDS database e.g. abcdefg.hijklmnop.eu-west-2.rds.amazonaws.com(
 - SNS_TOPIC=(the ARN of the SNS topic created by the cloudformation script - see Services > SNS)
 - VOLPLATFORM_LAYER_ARN=(the ARN of the volplatform layer created by the cloudformation script - see Lambda > Layers)


**Connect to the RDS DB**

In order to populate the DB you will need to connect to the new database.

As the database is hosted within an AWS Virtual Private Network you need to setup an EC2 Linux server as within the VPC that will act as a 'bastion' host.  Assign the EC2 key pair created above to the new EC2 server.

[Linux Bastion Hosts on AWS](https://aws.amazon.com/quickstart/architecture/linux-bastion/)

You will then be able to use your preferred DB GUI to access the RDS DB via SSH.


**Run the SQL Script**

Once connected to the DB run volplatform.sql.  This will seed the DB and provide some test data.

## Running the Volunteer Platform locally

The volunteer platform can be run locally via serverless offline.

However, an additional test (publicly-accessible i.e. outside of a VPN) RDS database will need to be setup manually via the AWS RDS console.  Once this has been setup take a note of the database name and access credentials.

Rename (or copy) .env.example.local to .env.local

Set the following keys

 - DATABASE_NAME=(new DB name)
 - DATABASE_USER=(new db user name)
 - DATABASE_PASSWORD=(new db password)
 - VOLNODEJS_LAYER_ARN=(package layer ARN discussed above)
 - DATABASE_HOST=(the deployed endpoint for your new RDS database e.g. abcdefg.hijklmnop.eu-west-2.rds.amazonaws.com(
 - VOLPLATFORM_LAYER_ARN=(the ARN of the volplatform layer created by the cloudformation script - see Lambda > Layers)

Note that SNS services cannot currently be run locally therefore transaction mail services must be tested via the AWS cloud deployment.

To run locally run the following commands

```bash
npm install
```

```bash
sls offline start
```

## Additional Steps

**Finding the API URL for the admin services**

In order to hook the admin-front-end up to the admin API created by this repository, you'll need the API URL.  Navigate to **Services** > **API Gateway** > [NEW-API] > **Stages** > [NEW-STAGE] > **Copy the invoke URL**

**Testing the API**

In order to establish that the API has been deployed correctly copy the invoke URL into a web browser followed by /divisions

e.g. https://n0000000000.execute-api.eu-west-2.amazonaws.com/dev/divisions

This should return an array of divisions.

**Setup hosting for the front-end environments**

The volunteer platform incorporates two front-end applications

- The registration form
- The admin front end

These can be hosted via the hosting platform of your choice.  AWS S3 static hosting is recommended.

## License
[MIT](https://choosealicense.com/licenses/mit/)