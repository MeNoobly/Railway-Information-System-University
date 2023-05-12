import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "..";
import { IContext } from "../types/context/context";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../route";
import { LOGIN_PATH, MAIN_PATH } from "../utils/consts";

const AppRouter: FC = observer(() => {
    const { user } = useContext<IContext>(Context);

    return (
        <>
            <Routes>
                {user.isAuth &&
                    authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                {user.isAuth &&
                    user.isAdmin &&
                    adminRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {user.isAuth ? (
                    <Route path="*" element={<Navigate to={MAIN_PATH} />} />
                ) : (
                    <Route path="*" element={<Navigate to={LOGIN_PATH} />} />
                )}
            </Routes>
        </>
    );
});

export default AppRouter;
