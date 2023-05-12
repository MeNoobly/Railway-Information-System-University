import { IUser, IUserStore } from "../types/store/userStore";
import { makeAutoObservable } from "mobx";

export default class UserStore implements IUserStore {
    public isAdmin = true;
    public isAuth = true;
    public user: IUser = {
        login: "",
        password: "",
    };

    constructor() {
        makeAutoObservable(this);
    }
}
