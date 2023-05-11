export interface IUser {
    login: string;
    password: string;
}

export interface IUserStore {
    isAdmin: boolean;
    isAuth: boolean;
    user: IUser;
}
