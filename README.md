# Api Chrome Extension

This repository stores the API connection to MySQL Database.
The MySQL Database can be found [here]()

## LogIn GET
Email log in for users

**URL** : `\emails`

**Method** : `GET`

**Auth required** : NO

## Success Response
Array of users.
For a User with **user_name** Alex on the database where that User has saved an
email address and name information.

For a User with **user_name** Pep on the database where that User has saved an
email address and name information.

```json
[{
    "user_name": "Alex",
    "email_address": "alex@gmail.com"
},
{
    "user_name": "Pep",
    "email_address": "pep@hotmail.com"
}]
```
## Error Response

**Code** : `500 BAD`

```json
{
    "error": "Error al obtener los elementos"
}
```

## LogIn POST
**URL** : `\emails`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "user_name": "[Name of the user]",
    "email_address": "[valid email address]"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": "user id stored in DB"
}
```

## Bad Response

**Code** : `500 BAD`

```json
{
  "error": "Error al crear el elemento"
}
```


### How is the data being stored?

| id (AutoIncrement)      | user_name | email_address |
| ----------- | ----------- | ----------- |
| 1      | Alex       |   alex@gmail.com          |
| 2   | Pep        |  pep@hotmail.com           |





