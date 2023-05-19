import db from "../db.js";

export async function getAllTrainsModel() {
    try {
        const data = await db.query("SELECT * FROM trains");
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getOneTrainModel(id) {
    try {
        const data = await db.query("SELECT * FROM trains WHERE id=$1", [id]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createTrainModel(trainName, numberOfVans) {
    try {
        const data = await db.query("SELECT * FROM add_train($1, $2)", [
            trainName,
            numberOfVans,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateTrainModel(id, trainName, numberOfVans) {
    try {
        const data = await db.query("SELECT * FROM update_train($1, $2, $3)", [
            id,
            trainName,
            numberOfVans,
        ]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteTrainModel(id) {
    try {
        const data = await db.query("SELECT * FROM delete_train($1)", [id]);
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
