import { IUser } from "../types/main/user";
import { makeAutoObservable } from "mobx";

export default class UserStore {
    private _isAdmin = true;
    private _isAuth = true;
    private _user: IUser | {} = {};

    constructor() {
        makeAutoObservable(this);
    }

    get isAdmin() {
        return this._isAdmin;
    }

    set isAdmin(isAdmin: boolean) {
        this._isAdmin = isAdmin;
    }

    get isAuth() {
        return this._isAuth;
    }

    set isAuth(isAuth: boolean) {
        this._isAuth = isAuth;
    }

    get user() {
        return this._user;
    }

    set user(user: IUser | {}) {
        this._user = user;
    }
}
