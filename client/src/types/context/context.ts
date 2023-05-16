import { IUserStore } from "../main/user";
import { IDepartureStore } from "../main/departures";
import { ITrainStore } from "../main/trains";

export interface IContext {
    user: IUserStore;
    departures: IDepartureStore;
    trains: ITrainStore;
}
