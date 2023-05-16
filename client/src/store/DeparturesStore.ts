import { makeAutoObservable } from "mobx";
import { IDeparture } from "../types/main/departures";

export default class DeparturesStore {
    private _departures: IDeparture[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get departures() {
        return this._departures;
    }

    set departures(departures: IDeparture[]) {
        this._departures = departures;
    }
}
