# cinemaManager REST API example application

Simple test app.

## Install

    npm install

## Run the app

    node server.js
By default runs on port 3000

## Run the tests

    npm test

# Login information

To register a new user specify keys 'username' and 'password' in the request's body.

`POST /api/register/`

Then you can use the same credentials sending them the same keys to log in.

`POST /api/login/`

# REST API

The REST API to the example app is described below.
All POST, PUT and DELETE routes require user to be logged in.

## Get list of halls

### Request

`GET /api/halls/`

### Response

    JSON containing list of all halls

## Create a new hall

### Request

`POST /api/halls/`

Value for key 'name' has to be specified in the request's body.

### Response

    "Successfully created new hall: hall_name."

## Get a specific hall

### Request

`GET /api/hall/hall_id`

### Response

    JSON containing specified hall

## Edit hall

### Request

`PUT /api/hall/hall_id`

Value for key 'name' has to be specified in the request's body.

### Response

    "Successfully updated hall: hall_name."

## Delete a hall

### Request

`DELETE /api/hall/hall_id`

Deletes the hall only if there are no future or present screenings assigned to it.

### Response

    Successfully deleted hall.

## Get list of screenings

### Request

`GET /api/screenings/hall_id`

### Response

    JSON containing list of all screenings for specified hall

## Create a new screening

### Request

`POST /api/screenings/hall_id`

Values for keys 'film', 'beginning' and 'end' have to be specified in the request's body.

Screenings for one hall can't overlap.

### Response

    "Successfully created new screening: screening_film."

## Get a specific screening

### Request

`GET /api/screening/screening_id`

### Response

    JSON containing specified screening

## Edit screening

### Request

`PUT /api/screening/screening_id`

Values for keys 'film', 'beginning' and 'end' have to be specified in the request's body.

To change screening's hall, value for key 'hall' has to be specified in the request's body.

Screenings for one hall can't overlap.

### Response

    "Successfully updated screening: screening_name."

## Delete a screening

### Request

`DELETE /api/screening/screening_id`

### Response

    Successfully deleted screening.
