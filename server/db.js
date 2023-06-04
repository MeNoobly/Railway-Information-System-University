import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();

class DB {
    pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: "localhost",
        port: 5432,
        database: "kursach",
    });

    changeUser(username, password) {
        process.env.DB_USER = username;
        process.env.DB_PASSWORD = password;

        this.pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: "localhost",
            port: 5432,
            database: "kursach",
        });
    }
}

export default new DB();
