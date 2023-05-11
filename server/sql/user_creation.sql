CREATE USER usual WITH PASSWORD 'usual';
GRANT /*права (как в 3 строке)*/ ON /*таблицы (как в 3 строке)*/ TO usual;
GRANT INSERT, UPDATE, DELETE ON users TO usual;
GRANT INSERT, UPDATE, DELETE ON tickets TO usual;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO usual; /* если что-то не работает */