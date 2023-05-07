CREATE USER usual WITH PASSWORD 'usual';
GRANT /*тут впишешь те права, которые считаешь нужными по аналогии с 3 строкой*/ ON /*тут впишешь те таблицы, которые считаешь нужными по аналогии с 3 строкой*/ TO usual;
GRANT INSERT, UPDATE, DELETE ON users TO usual;
GRANT INSERT, UPDATE, DELETE ON tickets TO usual;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO usual;
-- 4ю строку раскомментировать и выполнить, если не будет работать что-либо