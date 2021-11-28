<p align="center">
  HOST : <a href="https://sayna-user-test-api.herokuapp.com/" target="blank">https://sayna-user-test-api.herokuapp.com/</a>
</p>

## Description

This is a simple API allowing consumers to register users, manipulate users data with authentication method using NestJs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## All available endpoints

### All error responses

Take a look at possible error responses

+ Error HTTP.Status (application/json)
    ```json
        {
            "error" : "true",
            "message" : "A clear message about the occuting error"
        }
    ```

### Entry point [GET] [/]

+ Response 200 (application/json)

  This is a test API for SAYNA

### Log an user [POST] [/login]

You may log in in order to access users data. It takes a JSON
object containing login informations

+ Request (application/json)

    ```json
        {
            "email" : "user@email.user",
            "password" : "userPassword"
        }
    ```

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error" : false,
          "message": "L'utilisateur a été authentifié avec succès",
          "tokens": {
            "token": "votre access token",
            "referesh_token": "votre refresh token",
            "createdAt": "timestamps date now",
          },
        }
   ```

### Register an user [POST] [/register]

You have to register an user before logging in. It takes a JSON
object containing user informations. All fields are required

+ Request (application/json)

    ```json
        {
          "firstname": "First Name",
          "lastname": "Last Name",
          "email": "user@email.user",
          "password": "password",
          "date_naissance": "10/10/2002",
          "sexe": "F"
        }
    ```

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error": false,
          "message": "L'utilisateur a été créé",
          "user": {
              "_id": "61a2e83e7dfd2a129d431819",
              "firstname": "First Name",
              "lastname": "Last Name",
              "email": "user@email.user",
              "date_naissance": "10/10/2002",
              "sexe": "F",
              "createdAt": "2021-11-28T02:23:58.378Z"
          }
        }
   ```

### Get a specific user [GET] [/user/{$userId}] [Need authentication Bearer Token]

userId is the returned user _id from the server

+ Request (application/json)

    This endpoint is secured, be sure to use your access token as a authorization header of type "Bearer Token"

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error": false,
          "user": {
              "_id": "61a2e83e7dfd2a129d431819",
              "firstname": "First Name",
              "lastname": "Last Name",
              "email": "user@email.user",
              "date_naissance": "10/10/2002",
              "sexe": "F",
              "createdAt": "2021-11-28T02:23:58.378Z"
          }
        }
   ```

### Update a specific user [PUT] [/user/?id={$userId}] [Need authentication Bearer Token]

userId is the returned user _id from the server
The fields are optional

+ Request (application/json)

    This endpoint is secured, be sure to use your access token as a authorization header of type "Bearer Token"

    ```json
        {
          "firstname": "First Name change",
          "lastname": "Last Name change",
          "date_naissance": "10/10/2002",
          "sexe": "F",
        }
   ```

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error": false,
          "message": "L'utilisateur a été modifié avec succès",
        }
   ```

### Get all users [GET] [/users] [Need authentication Bearer Token]

+ Request (application/json)

    This endpoint is secured, be sure to use your access token as a authorization header of type "Bearer Token"

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error": false,
          "users": [
            {
              "_id": "61a2e83e7dfd2a129d431819",
              "firstname": "First Name",
              "lastname": "Last Name",
              "email": "user@email.user",
              "sexe": "F",
            }
          ],
        }
   ```

### Log out an user [DELETE] [/logout] [Need authentication Bearer Token]

+ Request (application/json)

    This endpoint is secured, be sure to use your access token as a authorization header of type "Bearer Token"

    ```json
      {
        "token": "Your refresh token"
      }
    ```

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error": false,
          "message": "L'utilisateur a été deconnecté avec succès"
        }
    ```

### Refresh the user access token [POST] [/refresh-token] [Need authentication Bearer Token]

+ Request (application/json)

    This endpoint is secured, be sure to use your access token as a authorization header of type "Bearer Token"

    ```json
      {
        "token": "Your refresh token"
      }
    ```

+ Response 201 (application/json)

    + Body

    ```json
        {
          "error": false,
          "message": "Le token a été rafraichi",
          "tokens": {
              "token": "Votre nouvel access token",
              "referesh_token": "Votre refresh token",
              "createdAt": "timestamp date now"
          }
        }
    ```

## Stay in touch

- Author - [Garina Léon](garina.leon@gmail.com)
