import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IContext } from "./types/context/context";
import UserStore from "./store/UserStore";
import DeparturesStore from "./store/DeparturesStore";
import TrainsStore from "./store/TrainsStore";
import VansStore from "./store/VansStore";
import RidesStore from "./store/RIdesStore";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const Context = createContext<IContext>({
    user: new UserStore(),
    departures: new DeparturesStore(),
    trains: new TrainsStore(),
    vans: new VansStore(),
    rides: new RidesStore(),
});

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                departures: new DeparturesStore(),
                trains: new TrainsStore(),
                vans: new VansStore(),
                rides: new RidesStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);
