# Getting Started with the API

## Setting up
Before being able to run this API, some environment variables have to be set first. The easiest way to set them up is to create a `.env` file under the root folder of the API project.

The `.env` file should have the following variables:

```
API_PORT="{PORT}"
MYSQL_USER="{USER}"
MYSQL_PASSWORD="{PWD}"
MYSQL_DB="{DB}"
MYSQL_URL="{URL}"
```

## Run
```
npm install
node apiServer.js
```