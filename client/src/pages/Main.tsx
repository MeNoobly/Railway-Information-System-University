import React, { FC, useContext, useEffect } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import RidesList from "../components/RidesList";
import { getRides } from "../http/ridesAPI";

const Main: FC = observer(() => {
    const { rides } = useContext(Context);

    useEffect(() => {
        getRides().then((data) => {
            if (data !== undefined) {
                rides.rides = data;
                console.log(rides.rides);
            }
        });
    }, [rides]);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Список маршрутов</h1>
            <RidesList list={rides.rides} />
        </div>
    );
});

export default Main;
