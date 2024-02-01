# ToDo Notes - Back End

> back end of an app for creating to-do notes made with typescript

## Setting up

Clone this repo and install all dependencies using:
```
npm i
```
Create a PostgreSQL database with the name of your liking and use the following sql query
```
CREATE TABLE IF NOT EXISTS public.notes
(
    id integer NOT NULL DEFAULT nextval('notes_id_seq'::regclass),
    title character varying(24) COLLATE pg_catalog."default" NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    favorite boolean DEFAULT false,
    color character varying(7) COLLATE pg_catalog."default" DEFAULT '#ffffff'::character varying,
    CONSTRAINT notes_pkey PRIMARY KEY (id)
);
```
then make an `.env` file using the `.env.example` file and insert your database url and the port you want this api to run in.

## Running the project

To start the code, run the following command

```
npm run dev
```

To run tests, input the following command

```
npm run test
```
Be warned, running tests will delete all notes currently on database and leave only one behind

## Using the API

This api was made to be used in conjunction with [corelab-front](https://github.com/duanzin/corelab-front).
However, if you want to interact with it directly it is recommended you use an api client like postman or insomnia.
All calls are made by sending a method to the api URL:

```
http://localhost:{port}
```

Below are the api routes and their uses.
All routes return a body like this:
```
[
    {
          "id": 1,
          "title": "first",
          "text": "not important not at all",
          "favorite": false,
          "color": "#B9FFDD"
        },
    {
          "id": 2,
          "title": "second",
          "text": "yet even more meaningless",
          "favorite": false,
          "color": "#FFFFFF"
        }
]
```

### POST Route

```
POST http://localhost:{port}/
```

Inserts a note into the notes table then returns an array with all notes
Expects a body like this:
```
{
    "title": "generic title",
    "text": "really generic text with no meaning whatsoever"
  }

```

### GET Route

Returns an array with all notes. Only runs when first entering or reloading the page.

```
GET http://localhost:{port}/
```

### DELETE Route

Deletes a note then returns an array with all notes curretnly on the database, minus the deleted one, of course.
You must put the id of the note you want to delete in the url.

```
DELETE http://localhost:{port}/{id}
```

### PATCH favorite Route

Sets a note "favorite" property to true or false, depending on its current value, then returns an array with all notes.
You must put the id of the note you want to update in the url.

```
PATCH http://localhost:{port}/favorite/{id}
```


### PATCH color Route

Changes a note's "color" to the one given by the body property to true or false, then returns an array with all notes.
You must put the id of the note you want to update in the url.

```
PATCH http://localhost:{port}/color/{id}
```

expects a body like this:
```
{ "color": "#B9FFDD" }
```

Remember, while you can set any color through api calls, the front end page only has 12 fixed colors it can change notes to.

### PUT Route

Changes a note's "title" and/or "text" to the one given by the body, then returns an array with all notes.
You must put the id of the note you want to update in the url.

```
PUT http://localhost:{port}/{id}
```

expects a body like this:
```
{
    "title": "generic title",
    "text": "really generic text with no meaning whatsoever"
  }
```
