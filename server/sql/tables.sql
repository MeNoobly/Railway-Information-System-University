CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	password VARCHAR(255),
	role VARCHAR(255)
);

CREATE TABLE trains(
	id SERIAL PRIMARY KEY,
	train_name VARCHAR(255),
	number_of_vans INT
);

CREATE TABLE vans(
	id SERIAL PRIMARY KEY,
	capacity INT,
	reserved INT,
	train_id INT NOT NULL REFERENCES trains(id)
);

CREATE TABLE rides(
	id SERIAL PRIMARY KEY,
	departure_date TIMESTAMP,
	arrival_date TIMESTAMP,
	departure_city VARCHAR(255),
	arrival_city VARCHAR(255),
	train_id INT NOT NULL REFERENCES trains(id)
);
