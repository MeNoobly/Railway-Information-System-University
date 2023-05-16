import React, { FC, useContext, useEffect } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { getDepartures } from "../http/departuresAPI";
import DeparturesList from "../components/DeparturesList";

const Main: FC = observer(() => {
    const { departures } = useContext(Context);

    useEffect(() => {
        getDepartures().then((data) => {
            if (data !== undefined) {
                departures.departures = data;
            }
        });
    }, [departures]);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Список маршрутов</h1>
            <DeparturesList list={departures.departures} />
        </div>
    );
});

export default Main;
