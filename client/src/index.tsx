import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import { IContext } from "./types/context/context";
import DeparturesStore from "./store/DeparturesStore";
import TrainsStore from "./store/TrainsStore";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const Context = createContext<IContext>({
    user: new UserStore(),
    departures: new DeparturesStore(),
    trains: new TrainsStore(),
});

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                departures: new DeparturesStore(),
                trains: new TrainsStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);
