import db from "../db.js";

export async function getDeparturesModel() {
    try {
        const data = await db.pool.query("SELECT * FROM departures_table()");
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
