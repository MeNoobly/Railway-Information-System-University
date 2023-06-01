import { $authHost, $host } from ".";
import { ITrain } from "../types/main/trains";

export const getTrains = async () => {
    try {
        const { data } = await $host.get<ITrain[]>("/api/trains/all");
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const getOneTrain = async (id: number) => {
    try {
        const { data } = await $authHost.post("/api/trains/one", {
            id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const createTrain = async (train: ITrain) => {
    try {
        const { data } = await $authHost.post("/api/trains/create", {
            trainName: train.train_name,
            numberOfVans: +train.number_of_vans,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const deleteTrain = async (train: ITrain) => {
    console.log(localStorage.getItem("token"));
    try {
        const { data } = await $authHost.post("/api/trains/delete", {
            id: train.id,
            headers: {
                // Accept: "application/json",
                // "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const changeTrain = async (train: ITrain) => {
    try {
        const { data } = await $authHost.post("/api/trains/update", {
            id: train.id,
            trainName: train.train_name,
            numberOfVans: +train.number_of_vans,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};
