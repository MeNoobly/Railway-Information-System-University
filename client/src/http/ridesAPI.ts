import { $authHost, $host } from ".";
import { normaliseDateForDB } from "../functions/date";
import { IRide } from "../types/main/rides";

export const getRides = async () => {
    try {
        const { data } = await $host.get<IRide[]>("/api/rides/all");
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const createRide = async (ride: IRide) => {
    try {
        const { data } = await $authHost.post("/api/rides/create", {
            departure_date: normaliseDateForDB(ride.departure_date),
            arrival_date: normaliseDateForDB(ride.arrival_date),
            departure_city: ride.departure_city,
            arrival_city: ride.arrival_city,
            train_id: ride.train_id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const deleteRide = async (ride: IRide) => {
    try {
        const { data } = await $authHost.post("/api/rides/delete", {
            id: ride.id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const changeRide = async (ride: IRide) => {
    try {
        const { data } = await $authHost.post("/api/rides/update", {
            id: ride.id,
            departure_date: new Date(ride.departure_date),
            arrival_date: new Date(ride.arrival_date),
            departure_city: ride.departure_city,
            arrival_city: ride.arrival_city,
            train_id: ride.train_id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};
