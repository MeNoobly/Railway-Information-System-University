import React, { FC, useContext, useEffect } from "react";
import TrainsList from "./TrainsList";
import { getTrains } from "../../../http/trainsAPI";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const TrainsAdmin: FC = observer(() => {
    const { trains } = useContext(Context);

    useEffect(() => {
        getTrains().then((data) => {
            if (data !== undefined) {
                trains.trains = data;
            }
        });
    }, [trains]);

    return (
        <div>
            <TrainsList list={trains.trains} />
        </div>
    );
});

export default TrainsAdmin;
