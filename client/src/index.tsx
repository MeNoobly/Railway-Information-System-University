import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import { IContext } from "./types/context/context";
import { QueryClient, QueryClientProvider } from "react-query";
import RidesStore from "./store/RidesStore";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const Context = createContext<IContext>({
    user: new UserStore(),
    rides: new RidesStore(),
});

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                rides: new RidesStore(),
            }}
        >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Context.Provider>
    </React.StrictMode>
);
