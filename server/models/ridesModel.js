import db from "../db.js";

export async function getAllRidesModel() {
    try {
        const data = await db.pool.query("SELECT * FROM rides");
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createRideModel(
    departureDate,
    arrivalDate,
    departureCity,
    arrivalCity,
    trainId
) {
    try {
        const data = await db.pool.query("CALL add_ride($1, $2, $3, $4, $5)", [
            departureDate,
            arrivalDate,
            departureCity,
            arrivalCity,
            trainId,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateRideModel(
    id,
    departureDate,
    arrivalDate,
    departureCity,
    arrivalCity,
    trainId
) {
    try {
        const data = await db.pool.query(
            "SELECT * FROM update_ride($1, $2, $3, $4, $5, $6)",
            [
                id,
                departureDate,
                arrivalDate,
                departureCity,
                arrivalCity,
                trainId,
            ]
        );
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteRideModel(id) {
    try {
        const data = await db.pool.query("SELECT * FROM delete_ride($1)", [id]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
