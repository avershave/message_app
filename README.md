# Message App

## Frontend: Quick Overview

This was mostly made to test the backend but decided to include it in the assessment.
The front end is React. I did not use Redux to make sure the application is simple.
The all of the styling is Bootstrap. Again, to keep the application simple.
The front end also uses a token that is stored in the client.

## Backend: Quick Overview

Coded in Express for simplicity. Wanted to show I understand creating RESTful API's.
I am still flexible in different languages. For example, I can use Flask, Django, ASP.net, etc.

## OneNote Link
[This a link to my notes I took before starting the assessment.](https://onedrive.live.com/view.aspx?resid=6F3C5A85CF37107%2174101&id=documentsonenote:https://d.docs.live.net06f3c5a85cf37107/Documents/backend%20assessment/)

## Client

I am assuming that this will be some sort of web app using MVC.
I also assume that the client will store a token in order to authenticate.
Frontend will make API calls in order to receive data.

## Server

Coded in Express.
I am assuming there will be some validation in the frontend.
Set up as a RESTful API with CRUD Users and Messages.
I know the requirements do not need a full CRUD but wanted to add for future use.

## Datastore

Database is MongoDB.
There's a docker-compose file available to use if you want to quickly setup a MongoDB instance.
I chose MongoDB because I am comfortable with it, it has easy syntax, and searches efficiently.
Uses JSON to communicate.

## API

### Users

    + ROUTE: users/
        - Finds all Users
    + ROUTE: users/add
        - Adds a user and encrypts their password
        - Request Params:
            + username: "string", required
            + password: "string", required
        - Reponse:
            + "Message added"
    + ROUTE: users/delete/:id
        - Deletes a user and the user's posts.
        - Request Params:
            + id: ObjectId as string, required
        - Response:
            + "User and all of the user's messages deleted"
    + ROUTE: users/edit/:id
        - Edits a user's username, password, or both username AND password
        - Also edits the message's author if it was written by the user
        - Request Params:
            + username: "string"
            + password: "string"
        - Response:
            + status: "Updated"
            + User Object
    + ROUTE: users/login
        - Used to log a user into the application
        - Takes a password as an unecrypted string and compares it to the encrypted string in the database.
        - Request Params:
            + username: "string"
            + password: "string"
        - Response:
            + token: this-is-an-auth-key,
            + userId: user.username,
            + Expiration: Expiration-date
            + NOTE: token and expiration date currently not coded for simplicity.

### Messages

    + ROUTE: messages/
        - Finds all Messages
    + ROUTE: messages/add
        - Adds a message
        - Request Params:
            + tags: "string", required
            + message: "string", required
            + author: "string", required
        - Reponse:
            + "Message added"
    + ROUTE: messages/delete/:id
        - Deletes a message
        - Request Params:
            + id: ObjectId as string, required
        - Response:
            + "Message deleted"
    + ROUTE: messages/edit/:id
        - Edits a message's tags, message, author
        - Request Params:
            + tags: "string"
            + message: "string"
            + author: "string"
        - Response:
            + status: "Updated"
            + Message Object
    + ROUTE: messages/search
        - Searches messages by the tags set by the user
        - Request Params:
            + tags: "string"
        - Response:
            + List of messages
