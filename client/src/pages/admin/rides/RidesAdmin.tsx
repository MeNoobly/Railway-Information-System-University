import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import { Context } from "../../..";
import { getRides } from "../../../http/ridesAPI";
import RidesList from "./RidesList";

const RidesAdmin: FC = observer(() => {
    const { rides } = useContext(Context);

    useEffect(() => {
        getRides().then((data) => {
            if (data !== undefined) {
                rides.rides = data;
            }
        });
    }, [rides]);

    return (
        <div className="mt-4 mb-4">
            <RidesList list={rides.rides} />
        </div>
    );
});

export default RidesAdmin;
