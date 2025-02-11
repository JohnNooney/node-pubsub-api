# node-pubsub-api
Node.js API that integrates with GCP Pub/Sub to create Topics, Subscriptions, and publish messages

## Pre-Req
- [Node.js]([url](https://nodejs.org/en/download/package-manager))
- [GCloud SDK](https://cloud.google.com/sdk/docs/install-sdk)
- (optional) [Docker]([url](https://docs.docker.com/get-docker/))

## GCP Setup
Create a project in GCP
`gcloud projects create PROJECT_ID`

**Important Note**: make sure to delete any resources that were created with this tool to avoid incurring any costs
Read more here - https://cloud.google.com/pubsub/docs/publish-receive-messages-console

## Local Deployment
Setting up credentials by running:
`gcloud auth application-default login`

Install the relevant dependencies by running:
`npm i`

Build and Run:
`node run start`

Test:
`node run tests`

## Docker Deployment
### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:3000.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
