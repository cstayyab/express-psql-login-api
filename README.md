# Minimal User Handling using Express.js and PostgreSQL

## Getting Started
Here is what you need to get it up and running:

## Pre-requisite
1. A running PostgreSQL Server
2. An empty DB on the PostgreSQL
3. `node` and `npm` installed
4. Postman or cURL (for testing the API)
5. A free `8080` PORT (you may change the port in `server.js`)

## Installation
1. Clone the repo

```bash
git clone https://github.com/cstayyab/express-psql-login-api.git
cd express-psql-login-api
```
2. Install the dependencies

```bash
npm install
```
## Configuration
You will have to update some values in `config/db.config.js`

|key|description|
|---|-----------|
|HOST| your host address on which postgreSQL is installed. Most probably `localhost`|
|USER| Username of the postgreSQL User (default: `postgres`)|
|PASSWORD|Password to the PostgreSQL User. You might have to set this via `\password username` command of PostgreSQL Shell|
|DB| The DB Name of the empty DB you created in the second step of Pre-requisites|

## Let's Go
You are now ready to start the API Server. Run the following command from the root of the repository:

```bash
npm start
```

## Demo
Here is a test run with output:
> Remember to set `Content-Type` to `application/json` for requests with body

### Test Route

#### Request

```bash
curl --location --request GET 'http://localhost:8080/'
```
#### Response

```json
{
    "message": "Welcome to Login System",
    "developer": {
        "name": "Muhammad Tayyab Sheikh",
        "alias": "cstayyab"
    }
}
```

### Signup

#### Request
```bash
curl --location --request POST 'http://localhost:8080/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "cstayyab",
    "email": "cstayyab@gmail.com",
    "password": "Test@1"
}'
```

#### Response 
```json
{
    "message": "Signup Successful!"
}
```

### Login

#### Request
```bash
curl --location --request POST 'http://localhost:8080/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "cstayyab",
    "password": "Test@1"
}'
```

#### Response
```json
{
    "message": "Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzdGF5eWFiIiwiZW1haWwiOiJjc3RheXlhYkBnbWFpbC5jb20iLCJpYXQiOjE2MTk0MDcwMTl9.AdPWIFeT0W89lUO85e9jyqJRqxV9ac7mJ4sdqmvPWQA"
}
```

### Change Password
> This route is for when user is already logged in and want to update their password.

#### Request
```bash
curl --location --request POST 'http://localhost:8080/user/changepassword' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzdGF5eWFiIiwiZW1haWwiOiJjc3RheXlhYkBnbWFpbC5jb20iLCJpYXQiOjE2MTk0MDcwMTl9.AdPWIFeT0W89lUO85e9jyqJRqxV9ac7mJ4sdqmvPWQA' \
--data-raw '{
    "oldpassword": "Test@1",
    "newpassword": "Test@2"
}'
```

#### Response
```json
{
    "message": "Password Updated Successfully!"
}
```

### Password Verification
>This route is for when user is logged in but want to change some sensitive information such as Email Address so we require re-authentication

#### Request
```bash
curl --location --request POST 'http://localhost:8080/user/verifypassword' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzdGF5eWFiIiwiZW1haWwiOiJjc3RheXlhYkBnbWFpbC5jb20iLCJpYXQiOjE2MTk0MDcwMTl9.AdPWIFeT0W89lUO85e9jyqJRqxV9ac7mJ4sdqmvPWQA' \
--data-raw '{
    "password": "Test@2"
}'
```
#### Response

```json
{
    "message": "Password Verification Successful!"
}
```

## Tested On
|Tool|Version String|
|:--|-------|
|NPM|6.14.12|
|Node|v14.16.1|
|PostgreSQL|psql (PostgreSQL) 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)|

## License
### MIT
