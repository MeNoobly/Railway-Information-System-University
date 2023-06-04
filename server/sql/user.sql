SELECT user;
SELECT * FROM pg_user;
SELECT * FROM pg_settings WHERE name = 'port';

CREATE USER default_user WITH PASSWORD 'user';
GRANT SELECT(id, name, password, role), INSERT, UPDATE, DELETE ON users TO default_user;
GRANT SELECT ON trains, vans, rides TO default_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO default_user;

CREATE USER admin WITH PASSWORD 'admin';
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON rides TO admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON trains TO admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON vans TO admin;
