import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import { IRoutes } from "./types/routes/routes";

export const publicRoutes: IRoutes[] = [
    { path: "/login", Component: Login },
    { path: "/registration", Component: Registration },
];

export const authRoutes: IRoutes[] = [{ path: "/main", Component: Main }];

export const adminRoutes: IRoutes[] = [{ path: "/admin", Component: Admin }];
