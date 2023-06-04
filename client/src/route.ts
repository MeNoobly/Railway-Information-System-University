import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { IRoutes } from "./types/routes/routes";

export const publicRoutes: IRoutes[] = [{ path: "/login", Component: Login }];

export const authRoutes: IRoutes[] = [
    { path: "/profile", Component: Profile },
    { path: "/main", Component: Main },
];

export const adminRoutes: IRoutes[] = [{ path: "/admin", Component: Admin }];
