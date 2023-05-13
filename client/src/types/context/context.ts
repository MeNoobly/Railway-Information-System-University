import { IRidesStore } from "../main/rides";
import { IUserStore } from "../main/user";

export interface IContext {
    user: IUserStore;
    rides: IRidesStore;
}
