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

export async function getOneUserModelId(id) {
    try {
        const data = await db.query("SELECT * FROM users WHERE id=$1", [id]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllUsersModel() {
    try {
        const data = await db.query("SELECT * FROM users");
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

export async function updateUserModel({ id, login, password }) {
    try {
        const data = await db.query("SELECT * FROM update_user($1, $2, $3)", [
            id,
            login,
            password,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteUserModel(id) {
    try {
        const data = await db.query("SELECT * FROM delete_user($1)", [id]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
