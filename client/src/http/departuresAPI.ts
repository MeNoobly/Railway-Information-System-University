import { $host } from ".";
import { IDeparture } from "../types/main/departures";

export const getDepartures = async () => {
    try {
        const { data } = await $host.get<IDeparture[]>("/api/departures/all");
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};
