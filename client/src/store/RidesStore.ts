import { makeAutoObservable } from "mobx";
import { IRide } from "../types/main/rides";
import { $host } from "../http";

export default class RidesStore {
    public rides: IRide[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getRides() {
        try {
            const response = await $host.get<IRide[]>("/api/routes/all");
            this.rides = response.data as IRide[];
            return response.data as IRide[];
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                alert(error);
            }
        }
    }
}
