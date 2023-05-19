import { makeAutoObservable } from "mobx";
import { IVan } from "../types/main/vans";

export default class TrainsStore {
    private _vans: IVan[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get vans() {
        return this._vans;
    }

    set vans(vans: IVan[]) {
        this._vans = vans;
    }
}
