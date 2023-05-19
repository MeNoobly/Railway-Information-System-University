import { $authHost, $host } from ".";
import { IVan } from "../types/main/vans";

export const getVans = async () => {
    try {
        const { data } = await $host.get<IVan[]>("/api/vans/all");
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const createVan = async (van: IVan) => {
    try {
        const { data } = await $authHost.post("/api/vans/create", {
            capacity: van.capacity,
            reserved: van.reserved,
            train_id: van.train_id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const deleteVan = async (van: IVan) => {
    try {
        const { data } = await $authHost.post("/api/vans/delete", {
            id: van.id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};

export const changeVan = async (van: IVan) => {
    try {
        const { data } = await $authHost.post("/api/vans/update", {
            id: van.id,
            capacity: van.capacity,
            reserved: van.reserved,
            train_id: van.train_id,
        });
        return data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            alert(error);
        }
    }
};
