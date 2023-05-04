CREATE OR REPLACE FUNCTION add_train(_train_name VARCHAR(30))
RETURNS VOID AS 
$BODY$
	BEGIN
		INSERT INTO trains(train_name)
		VALUES (_train_name);
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM add_train('fast_like_a_ponos');
SELECT * FROM add_train('slow_like_my_brain');
SELECT * FROM add_train('average_like_strominka');
SELECT * FROM add_train('kukuruza');
------------------------------------------- ADD DATA TO trains TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION delete_train(_train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		DELETE FROM trains WHERE id = _train_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_train(1);
------------------------------------------- DELETE DATA FROM trains TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION update_train(_train_id INT, _train_name VARCHAR(30))
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE trains SET train_name = _train_name WHERE id = _train_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_train(2, 'New_Kukruza');
------------------------------------------- UPDATE DATA FOR trains TABLE -------------------------------------------


CREATE OR REPLACE PROCEDURE add_ticket(_price FLOAT, _ride INT, _user_id INT) AS
$BODY$
	DECLARE
		_id_for_ride INT;
		_id_for_user INT;
	
	BEGIN		
		SELECT id INTO _id_for_ride FROM rides WHERE id = _ride;
		SELECT id INTO _id_for_user FROM users WHERE id = _user_id;
		
		IF _id_for_ride IS NOT NULL AND _id_for_user IS NOT NULL THEN
			INSERT INTO tickets(price, ride_id, user_id)
				VALUES (_price, _ride, _user_id);
			COMMIT;
		ELSE
			ROLLBACK;
		END IF;
	END;
$BODY$
LANGUAGE plpgsql;

CALL add_ticket(1210.50, 1, 1);
CALL add_ticket(990.25, 2, 2);
CALL add_ticket(500.0, 3, 1);
CALL add_ticket(200.99, 4, 2);
CALL add_ticket(255.99, 1, 1);
CALL add_ticket(255.99, 1, 5);
------------------------------------------- ADD DATA TO TICKETS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION delete_ticket(_ticket_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM tickets WHERE id = _ticket_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_ticket(4);
------------------------------------------- DELETE DATA FROM TICKETS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION update_ticket(_ticket_id INT, _price FLOAT, _ride INT, _user_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE tickets SET price = _price, ride_id = _ride, user_id = _user_id WHERE id = _ticket_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_ticket(2, 400, 3, 1);
------------------------------------------- UPDATE DATA FOR TICKETS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION add_user(_login VARCHAR(20), _password VARCHAR(20))
RETURNS VOID AS
$BODY$
	BEGIN
		INSERT INTO users(login, password)
		VALUES (_login, _password);
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM add_user('Nikita', 'qwerty228');
SELECT * FROM add_user('Ivan', 'POIUYT322');
------------------------------------------- ADD DATA TO USERS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION delete_user(_user_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM users WHERE user_id = _user_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_user(3);
------------------------------------------- DELETE DATA FROM USERS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION update_user(_user_id INT, _login VARCHAR(20), _password VARCHAR(20))
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE users SET login = _login, password = _password WHERE user_id = _user_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_user(1, 'Nikita Chupin', 'POIUYT');
------------------------------------------- UPDATE DATA FOR USERS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION add_ride(_departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(30), _arrival_city VARCHAR(30), _id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		INSERT INTO rides(departure_date, arrival_date, departure_city, arrival_city, train_id)
		VALUES (_departure_date, _arrival_date, _departure_city, _arrival_city, _id);
	END;
$BODY$
LANGUAGE plpgsql;
-- BE CAREFUL PLEASE!!!!!! LOOK AT train ID, PLEASE
SELECT * FROM add_ride('2014-04-04 20:00:00', '2014-04-05 20:00:00', 'Amsterdam', 'Moscow', 1);
SELECT * FROM add_ride('2016-04-04 20:00:00', '2016-04-05 20:00:00', 'Moscow', 'Amsterdam', 2);
SELECT * FROM add_ride('2020-11-28 15:30:00', '2020-11-28 19:15:00', 'London', 'Walles', 3);
SELECT * FROM add_ride('2020-12-18 12:10:00', '2020-12-18 16:55:00', 'Walles', 'London', 3);
------------------------------------------- ADD DATA TO rideS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION delete_ride(_ride_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM rides WHERE ride_id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_ride(3);
------------------------------------------- DELETE DATA FROM rideS TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION update_ride(_ride_id INT, _departure_date TIMESTAMP, _arrival_date TIMESTAMP, _departure_city VARCHAR(30), _arrival_city VARCHAR(30), _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE rides SET departure_date = _departure_date, arrival_date = _arrival_date, departure_city = _departure_city, arrival_city = _arrival_city, train_id = _train_id WHERE ride_id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_ride(4, '2023-05-01 14:15:00', '2023-05-01 16:55:00', 'Kishenev', 'Limassol', 6);
------------------------------------------- UPDATE DATA FOR rideS TABLE -------------------------------------------

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

-- Сделать откатную процедуру, если занятых мест больше чем мест всего

------------------------------------------- ADD DATA TO vans TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION delete_van(_van_id INT)
RETURNS VOID AS 
$BODY$
	BEGIN
		DELETE FROM vans WHERE id = _van_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM delete_van(3);
------------------------------------------- DELETE DATA FROM van TABLE -------------------------------------------


CREATE OR REPLACE FUNCTION update_ride(_ride_id INT, _capacity INT, _reserved INT, _train_id INT)
RETURNS VOID AS
$BODY$
	BEGIN
		UPDATE rides SET departure_date = _departure_date, arrival_date = _arrival_date, departure_city = _departure_city, arrival_city = _arrival_city, train_id = _train_id WHERE ride_id = _ride_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM update_ride(4, '2023-05-01 14:15:00', '2023-05-01 16:55:00', 'Kishenev', 'Limassol', 6);
------------------------------------------- UPDATE DATA FOR rideS TABLE -------------------------------------------


/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

это будет выводиться (в таком формате) как табличка с доступными рейсами на странице поиска
(для пользователя)

   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
CREATE OR REPLACE FUNCTION all_ride_info()
RETURNS TABLE (
	_departure_date TIMESTAMP,
	_arrival_date TIMESTAMP,
	_departure_city VARCHAR(30),
	_arrival_city VARCHAR(30),
	_train_name VARCHAR(30),
	is_full BOOLEAN
) AS
$BODY$
	BEGIN
		RETURN QUERY SELECT departure_date, arrival_date, departure_city, arrival_city, train_name,
		CASE WHEN trains.seats - trains.reserved_seats = 0 THEN TRUE ELSE FALSE END AS is_full FROM rides JOIN trains ON trains.train_id = rides.train_id;
	END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM all_ride_info();
------------------------------------------- COMPILED MULTITABLE REQUEST WITH 'CASE' EXPRESSION -------------------------------------------


/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

это будет выводиться (в таком формате) как табличка с купленными билетами на рейсы на страничке
редактирования в разделе редактирования билетов пользователей для администратора

   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
CREATE OR REPLACE VIEW ticket_info AS -- PRICE, DEP CITY, ARR CITY, USERNAME
	SELECT departure_city, arrival_city, price, login FROM rides INNER JOIN
		tickets ON rides.id = tickets.ride_id INNER JOIN
			users ON users.id = tickets.id;

SELECT * FROM ticket_info;
------------------------------------------- MULTITABLE VIEW REQUEST WITH TWO INNER JOINS -------------------------------------------


/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет выводиться как дорогостоящие билеты на рейсы во вкладке "бизнес класс" на страничке 
поиска, для пользователя
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT * FROM tickets WHERE price > (
	SELECT AVG(price) FROM tickets
);

/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет использоваться для выявления популярного рейса во вкладке "популярные направления" 
или "успейте купить" (где ещё есть места) но много занятых мест в самолёте, для пользователя
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT * FROM trains WHERE reserved_seats > (
	SELECT AVG(reserved_seats) FROM trains
) AND reserved_seats != seats;

/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет выводиться во вкладке "быстрые рейсы" (тут только рейсы, которые длятся меньше среднего)
для пользователя
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT * FROM rides WHERE arrival_date - departure_date < (
	SELECT AVG(arrival_date - departure_date) FROM rides
);

--SELECT EXTRACT(HOUR FROM (arrival_date - departure_date)) FROM rides AS day_diff;
------------------------------------------- CORRELATED REQUESTS -------------------------------------------


-- количество юзеров, которые купили билет за цену, больше средней | спросить в субботу у Дмитрия Саныча про то, можно ли запихнуть этот запро во вью, чтобы было удобнее его дёргать с сервера
/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
будет выводиться во вкладке настроек у администратора с подписью "буржуи"
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT COUNT(user_id) AS buisiness_class FROM users JOIN tickets ON tickets.user_id = users.user_id
	GROUP BY price
	HAVING price >= (SELECT AVG(price) FROM tickets);
------------------------------------------- HAVING REQUEST -------------------------------------------


/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет выводиться как названия самых больших самолётов во вкладке "интересное" или "о нас"
для пользователей
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT train_name FROM trains WHERE seats > (
	SELECT AVG(seats) FROM trains
);

/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет выводиться во вкладке "вылеты" для пользователя
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT * FROM (
	SELECT departure_date, arrival_date, departure_city, arrival_city FROM rides
) AS rides;

/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет выводиться во вкладке "статистика по занятости самолётов" для администратора
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT train_name,
	(SELECT COUNT(train_id) FROM rides WHERE rides.train_id = trains.train_id)
FROM trains;
------------------------------------------- SUBQUERY REQUEST (SELECT, FROM, WHERE) -------------------------------------------

-- вывести на экран билеты если в таблице есть билеты на тот же рейс
/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет выводиться для администратора во вкладке "конкурентные билеты"
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT ticket_id, price, ride, user_id
	FROM tickets tckt
	WHERE ride = ANY(
		SELECT ride FROM tickets tckt1 WHERE tckt != tckt1
	);

-- вывести на экран с помощью SELECT все билеты, где цена превышает цену каждого билета на 3 рейс
/* 
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
это будет во вкладке "настрйки" для администратора, для того, чтобы можно было сравнить цену 
билетов на все рейсы с целой билета на какой-то конкретный рейс
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
*/
SELECT *
	FROM tickets
	WHERE price > ALL(
		SELECT price FROM tickets WHERE ride = 3
	);
------------------------------------------- PREDICAT REQUEST (ANY, ALL) -------------------------------------------


-- пробуем вытащить номер билета, зная номер рейса
SELECT ticket_id, ride_id
	FROM tickets JOIN rides ON 
		tickets.ride = rides.ride_id

UPDATE tickets SET code = 'default_ticket';