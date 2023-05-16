import { $host } from ".";
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

export const createTrain = async () => {
    const { data } = await $host.get<ITrain[]>("/api/trains/all");
    console.log("поезд создан");
};

export const deleteTrain = async () => {
    const { data } = await $host.get<ITrain[]>("/api/trains/all");
    console.log("поезд удален");
};

export const changeTrain = async () => {
    const { data } = await $host.get<ITrain[]>("/api/trains/all");
    console.log("поезд изменен");
};
