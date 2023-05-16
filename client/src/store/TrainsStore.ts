import { makeAutoObservable } from "mobx";
import { ITrain } from "../types/main/trains";

export default class TrainsStore {
    private _trains: ITrain[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get trains() {
        return this._trains;
    }

    set trains(trains: ITrain[]) {
        this._trains = trains;
    }
}
