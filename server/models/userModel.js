import db from "../db.js";

export async function getOneUserModel(login) {
    try {
        const data = await db.query("SELECT * FROM users WHERE name=$1", [
            login,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createUserModel({ login, password }) {
    try {
        const data = await db.query("SELECT * FROM add_user($1, $2)", [
            login,
            password,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
