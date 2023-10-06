create TABLE person(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    wage INTEGER,
    about TEXT,
    email VARCHAR(255),
    userimage BYTEA
);