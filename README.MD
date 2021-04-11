# Technologies Used in this App's Stack

## FE

    - React

## BE

    - NodeJS (express)

## DB

    - postgresql
        - database setup (requires postgresl client and psql cli)
            1. passport_practice_db
            2. \c passport_practice_db
            3. create table users (id serial primary key, username varchar(255) unique not null, password varchar(255) not null, email varchar(255) unique not null);
        - Database is now setup and is ready for operations.

## Authentication/Authorization

    - passport
