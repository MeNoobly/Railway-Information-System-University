export interface IUser {
    id?: number;
    login: string;
    password?: string;
    role: "ADMIN" | "USER";
}

export interface IUserStore {
    isAdmin: boolean;
    isAuth: boolean;
    user: IUser | {};
}
