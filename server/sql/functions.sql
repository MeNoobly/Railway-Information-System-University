CREATE OR REPLACE FUNCTION add_train(_train_name VARCHAR(255), _number_of_vans INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		INSERT INTO trains(train_name, number_of_vans)
		VALUES (_train_name, _number_of_vans);
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_train(_train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		DELETE FROM vans WHERE train_id = _train_id;
		DELETE FROM rides WHERE train_id = _train_id;
		DELETE FROM trains CASCADE WHERE id = _train_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_train(_train_id INT, _train_name VARCHAR(255), _number_of_vans INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE trains SET train_name = _train_name, number_of_vans = _number_of_vans WHERE id = _train_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_user(_name VARCHAR(255), _password VARCHAR(255), _role VARCHAR(255))
RETURNS VOID AS
$BODY$
	BEGIN
		INSERT INTO users(name, password, role)
		VALUES (_name, _password, _role);
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_user(_user_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM users WHERE id = _user_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_user(2);

CREATE OR REPLACE FUNCTION update_user(_user_id INT, _username VARCHAR(255), _password VARCHAR(255), _role VARCHAR(255))
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE users SET name = _username, password = _password, role = _role WHERE id = _user_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_ride(_departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(255), _arrival_city VARCHAR(255), _id INT) AS
$BODY$
	DECLARE
		tr_id INT;
	BEGIN
		SELECT id INTO tr_id FROM trains WHERE id = _id;
		IF tr_id IS NOT NULL THEN
			INSERT INTO rides(departure_date, arrival_date, departure_city, arrival_city, train_id)
				VALUES (_departure_date, _arrival_date, _departure_city, _arrival_city, _id);
			COMMIT;
		ELSE
			ROLLBACK;
		END IF;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_ride(_ride_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM rides CASCADE WHERE id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_ride(_ride_id INT, _departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(255), _arrival_city VARCHAR(255), _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE rides SET departure_date = _departure_date, arrival_date = _arrival_date, departure_city = _departure_city, arrival_city = _arrival_city, train_id = _train_id WHERE id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_van(_capacity INT, _reserved INT, _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		INSERT INTO vans(capacity, reserved, train_id)
		VALUES (_capacity, _reserved, _train_id);
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_van(_van_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM vans WHERE id = _van_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_van(_van_id INT, _capacity INT, _reserved INT, _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE vans SET capacity = _capacity, reserved = _reserved, train_id = _train_id WHERE id = _van_id;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION departures_table()
RETURNS TABLE (_departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(255), _arrival_city VARCHAR(255),	_train_name VARCHAR(255), long_course_suburban TEXT) AS
$BODY$
	DECLARE
	full_train INT;
	all_seats INT;
	BEGIN
		RETURN QUERY SELECT departure_date, arrival_date, departure_city, arrival_city, train_name,
		CASE WHEN rides.arrival_date - rides.departure_date > INTERVAL '12 hours' THEN 'Long course' ELSE 'Suburban' END AS long_course_suburban FROM rides JOIN trains ON trains.id = rides.train_id;
	END;
$BODY$
LANGUAGE plpgsql;

-------------------------------------------------------------------------------------

CREATE OR REPLACE VIEW train_set AS
	SELECT trains, vans
		FROM trains JOIN vans ON 
			trains.id = vans.train_id;

------------------------------------------------------------------------------------

SELECT * FROM trains WHERE number_of_vans > (
	SELECT AVG(number_of_vans) FROM trains
);

SELECT * FROM vans WHERE reserved > (                											
	SELECT AVG(reserved) FROM vans
) AND reserved != capacity;

SELECT * FROM rides WHERE arrival_date - departure_date < (
	SELECT AVG(arrival_date - departure_date) FROM rides
);

------------------------------------------- CORRELATED REQUESTS -------------------------------------------

SELECT COUNT(capacity) AS all_capacity FROM vans
	GROUP BY reserved   																						
	HAVING reserved >= (SELECT AVG(reserved) FROM vans);

------------------------------------------- HAVING REQUEST -------------------------------------------

SELECT train_name FROM trains WHERE number_of_vans > (
	SELECT AVG(number_of_vans) FROM trains
);

SELECT * FROM (
	SELECT departure_date, arrival_date, departure_city, arrival_city FROM rides     						
) AS rides;

SELECT train_name,
	(SELECT COUNT(id) FROM rides WHERE rides.train_id = trains.id)
FROM trains;
------------------------------------------- SUBQUERY REQUEST (SELECT, FROM, WHERE) -------------------------------------------

SELECT ticket_id, price, ride, user_id
	FROM tickets tckt
	WHERE ride = ANY(
		SELECT ride FROM tickets tckt1 WHERE tckt != tckt1
	);

SELECT * FROM vans WHERE reserved = ANY(SELECT capacity FROM vans);

SELECT *
	FROM vans
	WHERE capacity > ALL(
		SELECT reserved FROM vans
	);
------------------------------------------- PREDICAT REQUEST (ANY, ALL) -------------------------------------------