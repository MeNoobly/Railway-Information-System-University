import { makeAutoObservable } from "mobx";
import { IRide } from "../types/main/rides";

export default class RidesStore {
    private _rides: IRide[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get rides() {
        return this._rides;
    }

    set rides(rides: IRide[]) {
        this._rides = rides;
    }
}
