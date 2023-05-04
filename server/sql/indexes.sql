CREATE INDEX airplane_name_idx ON airplanes(airpale_name);
CREATE UNIQUE INDEX login_idx ON users(login);
CREATE INDEX fl_idx ON flights(departure_date, arrival_date, departure_city, arrival_city);
CREATE INDEX tckt_idx ON tickets(price, flight, passanger_id);