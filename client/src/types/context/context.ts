import { IUserStore } from "../main/user";
import { IDepartureStore } from "../main/departures";
import { ITrainsStore } from "../main/trains";
import { IVansStore } from "../main/vans";
import { IRidesStore } from "../main/rides";

export interface IContext {
    user: IUserStore;
    departures: IDepartureStore;
    trains: ITrainsStore;
    vans: IVansStore;
    rides: IRidesStore;
}
