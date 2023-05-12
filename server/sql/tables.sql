CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	password VARCHAR(255)
);
SELECT * FROM users;

CREATE TABLE trains(
	id SERIAL PRIMARY KEY,
	train_name VARCHAR(30),
	number_of_vans INT
);
SELECT * FROM trains;

CREATE TABLE vans(
	id SERIAL PRIMARY KEY,
	capacity INT,
	reserved INT,
	train_id INT REFERENCES trains(id)
);
SELECT * FROM vans;
CREATE TABLE rides(
	id SERIAL PRIMARY KEY,
	departure_date TIMESTAMP,
	arrival_date TIMESTAMP,
	departure_city VARCHAR(30),
	arrival_city VARCHAR(30),
	train_id INT REFERENCES trains(id)
);
SELECT * FROM rides;

CREATE TABLE tickets(
	id SERIAL PRIMARY KEY,
	price FLOAT,
	ride_id INT REFERENCES rides(id),
	user_id INT REFERENCES users(id)
);
SELECT * FROM tickets;

----------------------------
DROP TABLE tickets CASCADE;
DROP TABLE users;
DROP TABLE rides;
DROP TABLE trains;
DROP TABLE vans;

----------------------------
TRUNCATE TABLE tickets;