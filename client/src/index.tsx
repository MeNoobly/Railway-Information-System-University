import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import { IContext } from "./types/context/context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const Context = createContext<IContext>({
    user: new UserStore(),
});

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);
