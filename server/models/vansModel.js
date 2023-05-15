import db from "../db.js";

export async function getAllVansModel() {
    try {
        const data = await db.query("SELECT * FROM vans");
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createVanModel(capacity, reserved, trainId) {
    try {
        const data = await db.query("SELECT * FROM add_van($1, $2, $3)", [
            capacity,
            reserved,
            trainId,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateVanModel(id, capacity, reserved, trainId) {
    try {
        const data = await db.query(
            "SELECT * FROM update_van($1, $2, $3, $4)",
            [id, capacity, reserved, trainId]
        );
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteVanModel(id) {
    try {
        const data = await db.query("SELECT * FROM delete_van($1)", [id]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
