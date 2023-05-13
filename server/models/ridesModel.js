import db from "../db.js";

export async function getRidesModel() {
    try {
        const data = await db.query("select * from departures_table()");
        return data.rows;
    } catch (error) {
        throw new Error(error);
    }
}
