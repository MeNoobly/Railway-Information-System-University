import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import { Context } from "../../..";
import { getVans } from "../../../http/vansAPI";
import VansList from "./VansList";

const VansAdmin: FC = observer(() => {
    const { vans } = useContext(Context);

    useEffect(() => {
        getVans().then((data) => {
            if (data !== undefined) {
                vans.vans = data;
            }
        });
    }, [vans]);

    return (
        <div className="mt-5">
            <VansList list={vans.vans} />
        </div>
    );
});

export default VansAdmin;
