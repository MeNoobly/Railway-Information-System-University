-- dont forget to create indexes!!!!!
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	login VARCHAR(20),
	password VARCHAR(20)
);
SELECT * FROM users;

-- dont forget to create !trigger! and !view! after creating this table!!!
CREATE TABLE tickets(
	id SERIAL PRIMARY KEY,
	price FLOAT,
	ride_id INT REFERENCES rides(id),
	user_id INT REFERENCES users(id)
);
SELECT * FROM tickets;

CREATE TABLE rides(
	id SERIAL PRIMARY KEY,
	departure_date TIMESTAMP,
	arrival_date TIMESTAMP,
	departure_city VARCHAR(30),
	arrival_city VARCHAR(30),
	train_id INT REFERENCES trains(id)
);
SELECT * FROM rides;

CREATE TABLE trains(
	id SERIAL PRIMARY KEY,
	train_name VARCHAR(30)
);
SELECT * FROM trains;

CREATE TABLE vans(
	id SERIAL PRIMARY KEY,
	capacity INT,
	reserved INT,
	train_id INT REFERENCES trains(id)
);
SELECT * FROM vans;


---------------------------- DROPPIN
DROP TABLE tickets CASCADE;
DROP TABLE users;
DROP TABLE rides;
DROP TABLE trains;
DROP TABLE vans;

---------------------------- DROPPIN
TRUNCATE TABLE tickets;