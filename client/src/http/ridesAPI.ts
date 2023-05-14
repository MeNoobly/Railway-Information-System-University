import { $host } from ".";
import { IRide } from "../types/main/rides";

export const getRides = async () => {
    try {
        const { data } = await $host.get<IRide[]>("/api/routes/all");
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};
