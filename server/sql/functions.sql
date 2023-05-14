CREATE OR REPLACE FUNCTION add_train(_train_name VARCHAR(30))
RETURNS VOID AS 
$BODY$
	BEGIN
		INSERT INTO trains(train_name)
		VALUES (_train_name);
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM add_train('train_1');
SELECT * FROM add_train('train_2');
SELECT * FROM add_train('train_3');

--------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION delete_train(_train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		DELETE FROM trains WHERE id = _train_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_train(1);
--------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION update_train(_train_id INT, _train_name VARCHAR(30), _number_of_vans INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE trains SET train_name = _train_name, number_of_vans = _number_of_vans WHERE id = _train_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_train(5, 'New_WITH_TRIG', 15);
-------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION add_user(_name VARCHAR(20), _password VARCHAR(20))
RETURNS VOID AS
$BODY$
	BEGIN
		INSERT INTO users(name, password)
		VALUES (_name, _password);
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM add_user('Nikita', 'qwerty228');
------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION delete_user(_user_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM users WHERE id = _user_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_user(2);
------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION update_user(_user_id INT, _username VARCHAR(20), _password VARCHAR(20))
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE users SET name = _username, password = _password WHERE id = _user_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_user(1, 'Nikita Chupin', '12345');
------------------------------------------------------------------------------------


CREATE OR REPLACE PROCEDURE add_ride(_departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(30), _arrival_city VARCHAR(30), _id INT) AS
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
CALL add_ride('2023-10-18 07:00:00', '2023-10-28 09:40:00', 'New-Dheli', 'Moscow', 4);
CALL add_ride('2023-10-18 07:00:00', '2023-10-28 09:40:00', 'New-Dheli', 'Moscow', 1224);
--------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION delete_ride(_ride_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM rides CASCADE WHERE id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_ride(5);
------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION update_ride(_ride_id INT, _departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(30), _arrival_city VARCHAR(30), _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE rides SET departure_date = _departure_date, arrival_date = _arrival_date, departure_city = _departure_city, arrival_city = _arrival_city, train_id = _train_id WHERE id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_ride(3, '2023-05-01 14:15:00', '2023-05-01 16:55:00', 'Kishenev', 'Limassol', 4);
----------------------------------------- -------------------------------------------

CREATE OR REPLACE FUNCTION add_van(_capacity INT, _reserved INT, _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		INSERT INTO vans(capacity, reserved, train_id)
		VALUES (_capacity, _reserved, _train_id);
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM add_van(50, 10, 3);
SELECT * FROM add_van(50, 20, 2);
SELECT * FROM add_van(30, 15, 1);
SELECT * FROM add_van(30, 15, 4);
-------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION delete_van(_van_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM vans WHERE id = _van_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_van(3);
----------------------------------------- -------------------------------------------


CREATE OR REPLACE FUNCTION update_van(_van_id INT, _capacity INT, _reserved INT, _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE vans SET id = _van_id, capacity = _capacity, reserved = _reserved, train_id = _train_id WHERE id = _van_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_van(4, 10, 5, 3);
------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION departures_table()
RETURNS TABLE (_departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(30), _arrival_city VARCHAR(30),	_train_name VARCHAR(30), long_course_suburban TEXT) AS
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

SELECT * FROM departures_table();
-------------------------------------------------------------------------------------

CREATE OR REPLACE VIEW train_set AS
	SELECT trains, vans
		FROM trains JOIN vans ON 
			trains.id = vans.train_id;

SELECT * FROM train_set;
------------------------------------------------------------------------------------


-- SELECT * FROM tickets WHERE price > (
-- 	SELECT AVG(price) FROM tickets
-- );

-- SELECT * FROM trains WHERE reserved_seats > (                											ТУТ ТЕБЕ НАДО САМОМУ ПРИДУМАТЬ ИДЕИ ДЛЯ ЗАПРОСОВ, МНЕ ИХ ПОТОМ СКАЖЕШЬ, Я ТЕБЕ СДЕЛАЮ
-- 	SELECT AVG(reserved_seats) FROM trains
-- ) AND reserved_seats != seats;

-- SELECT * FROM rides WHERE arrival_date - departure_date < (
-- 	SELECT AVG(arrival_date - departure_date) FROM rides
-- );

------------------------------------------- CORRELATED REQUESTS -------------------------------------------


-- количество юзеров, которые купили билет за цену, больше средней
-- SELECT COUNT(user_id) AS buisiness_class FROM users JOIN tickets ON tickets.user_id = users.user_id
-- 	GROUP BY price   																						ТУТ ТЕБЕ НАДО САМОМУ ПРИДУМАТЬ ИДЕИ ДЛЯ ЗАПРОСОВ, МНЕ ИХ ПОТОМ СКАЖЕШЬ, Я ТЕБЕ СДЕЛАЮ
-- 	HAVING price >= (SELECT AVG(price) FROM tickets);
------------------------------------------- HAVING REQUEST -------------------------------------------


-- SELECT train_name FROM trains WHERE seats > (
-- 	SELECT AVG(seats) FROM trains
-- );

-- SELECT * FROM (
-- 	SELECT departure_date, arrival_date, departure_city, arrival_city FROM rides     						ТУТ ТЕБЕ НАДО САМОМУ ПРИДУМАТЬ ИДЕИ ДЛЯ ЗАПРОСОВ, МНЕ ИХ ПОТОМ СКАЖЕШЬ, Я ТЕБЕ СДЕЛАЮ
-- ) AS rides;

-- SELECT train_name,
-- 	(SELECT COUNT(train_id) FROM rides WHERE rides.train_id = trains.train_id)
-- FROM trains;
------------------------------------------- SUBQUERY REQUEST (SELECT, FROM, WHERE) -------------------------------------------

-- вывести на экран билеты если в таблице есть билеты на тот же рейс
-- SELECT ticket_id, price, ride, user_id
-- 	FROM tickets tckt
-- 	WHERE ride = ANY(
-- 		SELECT ride FROM tickets tckt1 WHERE tckt != tckt1
-- 	);

-- -- вывести на экран с помощью SELECT все билеты, где цена превышает цену каждого билета на 3 рейс		ТУТ ТЕБЕ НАДО САМОМУ ПРИДУМАТЬ ИДЕИ ДЛЯ ЗАПРОСОВ, МНЕ ИХ ПОТОМ СКАЖЕШЬ, Я ТЕБЕ СДЕЛАЮ
-- SELECT *
-- 	FROM tickets
-- 	WHERE price > ALL(
-- 		SELECT price FROM tickets WHERE ride = 3
-- 	);
------------------------------------------- PREDICAT REQUEST (ANY, ALL) -------------------------------------------