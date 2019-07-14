---
path: "/blog/getting-started-with-aws-sam"
date: "2019-07-12"
title: "Getting Started with AWS SAM"
description: "A introduction to AWS Serverless Application Model (SAM)"
hero: "./blog-hero.jpg"
---
AWS Lambda is Amazon's function as a service, (FaaS), offering and recently I've been playing around with it.
I've used Lambda in the past for really bite-sized applications, every time one visits my personal website on the `www` sub-domain,
a Lambda redirects from https://www.nikmouz.dev to https://nikmouz.dev, however I've always been hesitant to use the technology to
create anything too complex. There are a few reasons for this. I found it difficult to run and debug a Lambda
locally in a manner comparable to a production like setting. Interacting with other AWS resources locally without embedding 
AWS credentials in my code, risking accidentally committing them into source control is also a nuisance. 

Then I discovered AWS SAM. AWS Serverless Application Model (SAM), is an open-source framework that focuses on providing
developer friendly tools to create serverless applications on AWS. It utilises Docker to emulate an environment akin to a deployed AWS Lambda,
allowing us to develop, run, test and deploy a serverless application with ease.
In this blog I'm going to demonstrate how to get up and running with AWS SAM, its benefits and its weaknesses...

## Pre-reqs
In order to play along, install the following:

- [AWS ClI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Docker](https://docs.docker.com/install/)
- [Node](https://nodejs.org/en/download/package-manager/)

Ensure AWS credentials are set up by running `aws configure`.

## Getting Started
Initialise a sample AWS SAM project by running `sam init`, this will create a new directory named "sam-app".
If we enter this directory, we will see the following files:

```
.
├── README.MD                   <-- Instructions for SAM project
├── event.json                  <-- A sample event payload for API Gateway
├── hello-world                 <-- Source code for a lambda function
│   └── app.js                  <-- Lambda function code
│   └── package.json            <-- NodeJS dependencies and scripts
│   └── tests                   <-- Unit tests
│       └── unit
│           └── test-handler.js
├── template.yaml               <-- SAM template
```

This command generated a SAM project consisting of a NodeJS application configured with one API Gateway endpoint on `/hello` that responds with a
HTTP 200 with message "hello world".

Note: Throughout this blog I will be sticking with NodeJS as the runtime, because it is the default, however SAM also supports:
Java, C#, Powershell, Go, Ruby, and Python.

## Up and Running
SAM bakes in best practise for AWS, it enforces the use of infrastructure as code using a wrapper of CloudFormation templates named SAM templates.
If we open our SAM template: `template.yaml`, we'll see the following:

```
  HelloWorldFunction:               <-- Name of our function
    Type: AWS::Serverless::Function <-- Type of resource
    Properties:
      CodeUri: hello-world/ 
      Handler: app.lambdaHandler    <-- app is hello-world/app.js, lambdaHandler is exported function in app.js
      Runtime: nodejs8.10           <-- Runtime of our Lambda
      Events:                       <-- All endpoints
        HelloWorld:                 <-- Endpoint name
          Type: Api
          Properties:
            Path: /hello            <-- Endpoint path
            Method: get             <-- Endpoint method
```

The `AWS::Serverless::Function` resource type is a really concise way of creating an API Gateway instance with an endpoint,
a Lambda to execute our code and an IAM Role to allowing for the permissions to run the Lambda and write logs to CloudWatch.
The "HelloWorldFunction" resource executes the `lambdaHandler` function in `app.js`, on a HTTP GET request to `/hello`.

Now that we understand what our SAM app is doing, lets run it!
Run: `sam local start-api`, visit `http://localhost:3000/hello` and behold... hello world.

Let's open our app.js file and change "hello world" to "greetings world", save the file, then refresh `http://localhost:3000/hello` and
watch the greeting change. Nice, no need to restart to server or any other nonsense for code changes,
(restarting the server is required for changes to the template.yaml file however).

So we can run our Lambda locally and experience hot reloading on our code changes, this already severely beats my previous approach to
Lambda development where I had to manually upload my code changes to Lambda every time I wanted to run my application in a production like setting.

## Debugging 
AWS SAM also gives us the tools to debug our Lambdas, instead of entirely relying on the ol' console.log.
The AWS Toolkit Plugin can be installed for a number of different IDEs/ text editors to make debugging easier e.g. Visual Studio Code, IntelliJ, PyCharm.
Since we are creating our application using Node, my example here will be demonstrating debugging using Visual Studio Code,
however [AWS documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-debugging.html)
specifies in detail the process for other IDEs.

To begin debugging our Lambdas in VSCode, first open the `sam-app` project in VSCode.
Following this, we'll need to select to the Debug icon on the left toolbar, (or Ctrl+Shift+D).
Open the dropdown next to the text Debug and select Add Configuration. This will open up a text editor for `launch.json`, paste the following JSON:

```
{
    "version": "0.2.0",
    "configurations": [
        
        {
            "name": "Attach to SAM CLI",
            "type": "node",
            "request": "attach",
            "address": "localhost",
            "port": 5858,
            "localRoot": "${workspaceRoot}/hello-world",
            "remoteRoot": "/var/task",
            "protocol": "inspector",
            "stopOnEntry": false
        }
    ]
}
```

Note: The `localRoot` property value "hello-world" should be changed to the name of the directory containing our Lambda application code.

Then run our Lambdas locally with the debug flag at port 5858: `sam local start-api -d 5858`.
Once this is running, add a breakpoint to a line in our Lambda function, then hit the Play icon on the Attach to SAM CLI configuration we just added. 
Finally invoke the function e.g. visit `http://localhost:3000/hello` and we can start debugging our Lambda within VSCode.

This GIF on AWS documentation runs through the whole debugging process quite nicely.

![image](/sam-debug.gif)

## Deploying
In order to deploy the application, we must create an S3 bucket to contain our application code along with its dependencies.
Run `aws s3 mb s3://BUCKET_NAME` to create an S3 bucket.

Note: BUCKET_NAME should be replaced with a more suitable name.

Next run: `sam package --output-template-file packaged.yaml --s3-bucket BUCKET_NAME`.
This long command will do a few things, it will upload our application code with its dependencies to our S3 bucket, then it will convert
our SAM template to a CloudFormation template named `packaged.yaml`, updating the `CodeUri` property to point to our S3 bucket
when our application code now resides. 

Finally run `sam deploy --template-file packaged.yaml --stack-name sam-app --capabilities CAPABILITY_IAM`. This command is a wrapper around
the `aws cloudformation deploy` command and simply deploys a stack, in this case called sam-app, from the `packaged.yaml` template file
with the permissions to create IAM resources and schedules our specified resources to be created.
You can visit the CloudFormation page in the AWS Console to view the progress of resource creation. Once our resources have been 
successfully created, we can click Outputs, then click the url titled `HelloWorldApi` to execute the deployed Lambda. 

## Interact with Other AWS Resources
So we have deployed our application and greeted the world. Greeting the world is a little impersonal though,
let's add DynamoDB so we can greet specific people by their real names! AWS SAM makes this really easy and allows us to 
run our Lambda locally against AWS resources, without the need of AWS credentials.

Add the following to our `template.yml` within the Resources section:

```
  Resources:
  ...
    NamesTable:
      Type: AWS::Serverless::SimpleTable
      Properties:
        TableName: Names
        PrimaryKey:
          Name: id
          Type: String
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
        SSESpecification:
          SSEEnabled: true
```

This will create a simple DynamoDB table with a single primary key, named `id` in this case.
Before we continue, deploy these changes to actually create the DynamoDB table. Our Lambda will need it to actually exist in order to interact with it.

Note: It is possible to start a local Docker container version of DynamoDB and run a
Lambda locally against it, however AWS SAMs tooling does not help with this and it is our responsibility to ensure the Lambda container and DynamoDB
container can actually see each other. Conditional logic in the Lambda to connect to the local DynamoDB Docker container if you are running the
Lambda locally, else in production, connect to the real DynamoDB would also be required.
I did experiment with this but concluded that it was just easier to run a Lambda locally against real AWS resources.

Now we need an additional Lambda to write names of people that need to be greeted to this shiny new database table.
Since this Lambda needs to be able to write to our database, it needs the have appropriate IAM Role. Luckily AWS SAM makes this really simple.

Add the following code to our `template.yml` in the resources section:

```
  Resources:
  ...
    AddNameFunction:
      Type: AWS::Serverless::Function
      Properties:
        CodeUri: hello-world/
        Handler: app.addName
        Runtime: nodejs8.10
        Policies:
          - DynamoDBCrudPolicy:
              TableName: !Ref NamesTable
        Events:
          HelloWorld:
            Type: Api
            Properties:
              Path: /add-name
              Method: post
```

This will create a new API Gateway endpoint `/add-name` that will accept HTTP POST requests and runs the function `addName` in `app.js`.
Notice the predefined `DynamoDBCrudPolicy` in the Policy section; AWS SAM has a bunch of pre-canned policies for access to common services,
like the one we defined on NamesTable for DynamoDB CRUD operations. You can view the other Policy Templates [here](https://github.com/awslabs/serverless-application-model/blob/master/docs/policy_templates.rst).

Time to actually create our `addNames` function. First install the AWS SDK: `npm install aws-sdk`, then we can write the following code:

```
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
...
exports.addName = async (event, context) => {
    let response;
    const { name } = JSON.parse(event.body); // fetch name property from POST request body
    const id = Buffer.from(name).toString('base64'); // base64 name to get unique id

    const params = {
        TableName: 'Names',
        Item: {
            id,
            name
        }
    };

    try {
        await db.put(params).promise();
        response = {
            statusCode: 201,
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: err.message })
        };
    }

    return response;
}
```

Now when we perform a HTTP POST to `http://localhost:3000/add-name` with a JSON body of: `{ "name": "BoJack Horseman" }`,
we should get a new entry in our table for Mr Horseman himself. Try it out.

Now lets add a new Lambda to read from our Names table and greet those lucky few.
Add the following to our `template.yml`:

```
  Resources:
  ...
    GreetNamesFunction:
      Type: AWS::Serverless::Function
      Properties:
        CodeUri: hello-world/
        Handler: app.greetNames
        Runtime: nodejs8.10
        Policies:
          - DynamoDBCrudPolicy:
              TableName: !Ref NamesTable
        Events:
          HelloWorld:
            Type: Api
            Properties:
              Path: /greet-names
              Method: get
```

Then lets write the function itself:

```
exports.greetNames = async (event, context) => {
    let response;

    try {
        const names = (await db.scan({ TableName: 'Names' }).promise())
            .Items.map((item) => item.name);

        response = {
            statusCode: 200,
            body: JSON.stringify({ message: `hello ${names}` })
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
            })
        }
    }

    return response;
}
```

This function simply fetches all items from our Names table, maps the name property and then returns a greeting with all the names.

Let's also add the URLs for our new endpoints in the Outputs section so we can easily access them when we deploy:

```
  Outputs:
    ...
    GreetNamesApi:
      Description: "API Gateway endpoint URL for Prod stage for Greet Names function"
      Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/greet-names/"
    AddNameApi:
      Description: "API Gateway endpoint URL for Prod stage for Add Name function"
      Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/add-name/"
  ...
```

Now all is left to do is to deploy, get the URLs from the Outputs section in the AWS Console CloudFormation page and try out our Lambdas in the wild.

So here we have demonstrated that we can interact with AWS resources whilst running Lambda locally, purely using IAM Roles.
This approach is recommended by AWS themselves and eliminates the risk of misplacing AWS credentials.

## Conclusion
There is no question that AWS SAM vastly improves developer experience when creating Lambdas. I can speak with certainty when exclaiming that all future Lambdas I personally
work on will be creating via AWS SAM. This blog demonstrates the removal of my hesitations regarding running and debugging Lambdas locally in a manner comparable
to production as well as interacting with other AWS resources locally without AWS credentials. So is it time to abandon tried and tested frameworks like Spring, Express and Django in
favour of Lambda supported by AWS SAM? Like many aspects of software development, there isn't a clear cut yes or no answer to that question.
I'd rather answer with a "sometimes...", trailing off and looking deep in thought. 

Lambda can be described as a function in the sky, and whilst this is an incredible feat in itself, it is not without weakness.
It's just standalone plain code. You do not get to enjoy the rich, crafted tooling a framework like Spring, Django and Express give out of the box.
Common problems like dependency management and secret management become harder because they aren't solved for you. You have to go into the wild and find standalone dependencies 
that meet your requirements or roll your own solution. Now this isn't so much an issue for every application, especially smaller scale applications, 
but for larger scale applications, the appeal for the batteries included approach a framework provides is still attractive. 

The source code can be found at: https://github.com/Mouzourides/aws-sam-hello-world