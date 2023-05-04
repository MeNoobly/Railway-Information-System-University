SELECT user;
SELECT * FROM pg_user;
SELECT * FROM pg_settings WHERE name = 'port';

CREATE USER default_user WITH PASSWORD '12345678';
GRANT INSERT, UPDATE, DELETE ON tickets TO default_user;
GRANT INSERT, UPDATE, DELETE ON users TO default_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO default_user;

/*
строка подключения через консоль следующая:
psql -U postgres (затем пароль)
ЛИБО
psql -U postgres kurs; где kurs - название базы, к которой хотим подключиться
затем также пароль.
если пытаться подключиться с дефолт_усера, то выскакивает ошибка, что нет базы такой, хотя с постгресом нет такой ошибки...
\c <dataBaseName>
\q
*/