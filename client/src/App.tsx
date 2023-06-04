import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { IUser } from "./types/main/user";

const App = observer(() => {
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        check()
            .then(() => {
                user.user = JSON.parse(localStorage.getItem("user") as string);
                if ((user.user as IUser).role === "ADMIN") {
                    user.isAdmin = true;
                }
                user.isAuth = true;
            })
            .catch((error: Error) => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }, [user]);

    if (isLoading) {
        return <Spinner animation="grow" />;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
