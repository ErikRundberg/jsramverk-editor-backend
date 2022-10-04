# jsramverk editor - Backend
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---
## Table of Contents

* [Prerequisites](https://github.com/ErikRundberg/jsramverk-editor-backend#prerequisities)
* [Setup](https://github.com/ErikRundberg/jsramverk-editor-backend#setup)
  * [MongoDB Atlas](https://github.com/ErikRundberg/jsramverk-editor-backend#mongodb-atlas)
  * [Local server](https://github.com/ErikRundberg/jsramverk-editor-backend#local-server)
  * [Start server](https://github.com/ErikRundberg/jsramverk-editor-backend#start-server)
* [API Documentation](https://github.com/ErikRundberg/jsramverk-editor-backend#api-documentation)
  * [All endpoints](https://github.com/ErikRundberg/jsramverk-editor-backend#get-all-available-endpoints)
  * [All documents](https://github.com/ErikRundberg/jsramverk-editor-backend#get-all-documents)
  * [Get document](https://github.com/ErikRundberg/jsramverk-editor-backend#get-specific-document)
  * [Create / update document](https://github.com/ErikRundberg/jsramverk-editor-backend#create-/-update-a-document)

---

## Prerequisites
Installed Node.js and npm - [Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Installed MongoDB - [Link](https://www.mongodb.com/docs/manual/installation/)
## Setup
Install dependencies
```shell
npm install
```
Create an environment file in root-folder
```shell
touch .env
```

There are two choice, either host the database locally or in the cloud with MongoDB atlas

### MongoDB Atlas
Inside the .env file input
```
ATLAS_USERNAME="<YOUR_USERNAME>"
ATLAS_PASSWORD="<YOUR_PASSWORD>"
```

### Local server
The standard method is to use azure, if you want to use a local server then NODE_ENV is needed.

The standard port is 1338 but can be changed inside the .env file.

Inside the .env file input
```
NODE_ENV="local"

--- optional ---
PORT=<YOUR_PORT>
```

### Start server
To start the server: `npm start`

---

# Mail service
To enable the mail service a sendgrid api key is needed.

[Sendgrid](https://sendgrid.com/) is a free mail service provider.

Setup a web application and insert the API key in the .env file

```
SENDGRID_API_KEY='<YOUR_API_KEY>'
```

---

# API Documentation

## Get all available endpoints

**URL** : `/`

**METHOD** : `GET`

### Successful response
```json
{
    "status": 200,
        "data": {
        "endpoints": [
            {
            "method": "GET",
            "url": "/docs",
            "description": "Get all documents"
            },
            {
            "method": "POST",
            "url": "/docs",
            "description": "Create/Update a document"
            },
            {
            "method": "GET",
            "url": "/docs/:id",
            "description": "Get a specific document"
            }
        ]
    }
}
```
---

## Get all documents

**URL** : `/docs`

**METHOD** : `GET`

### Successful response
```json
{
  "status": 200,
  "data": [
    {
      "_id": "631bcc49620001f89cd8080c",
      "title": "Documentation",
      "content": "The available text of the document"
    }
  ]
}
```
---

## Get specific document

**URL** : `/docs/:id`

**METHOD** : `GET`

### Successful response
```json
{
  "status": 200,
  "data": {
      "_id": "631bcc49620001f89cd8080c",
      "title": "Documentation",
      "content": "The available text of the document"
    }
}
```

## Create / update a document

**URL** : `/docs`

**METHOD** : `POST`

### Data example
```json
{
  "title": "Documentation",
  "content": "The available text of the document"
}
```

### Successful response
```json
{
    "status": 201,
    "data": {
        "_id": "631de4f8f0e2fcfdadad1fea",
        "title": "Test",
        "content": "Potatis gror underjorden!"
    }
}
```
