import { makeAutoObservable } from "mobx";
import { ITrain } from "../types/main/trains";

export default class TrainsStore {
    private _trains: ITrain[] = [];
    private _selectedTrain = "";

    constructor() {
        makeAutoObservable(this);
    }

    get trains() {
        return this._trains;
    }

    get selectedTrain() {
        return this._selectedTrain;
    }

    set trains(trains: ITrain[]) {
        this._trains = trains;
    }

    set selectedTrain(selectedTrain: string) {
        this._selectedTrain = selectedTrain;
    }
}
