# ToDo Notes - Back End

> back end of an app for creating to-do notes

## Setting up

Clone this repo and install all dependencies using:
```
npm i
```
Create a PostgreSQL database with the name of your liking and use the followeing sql query
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