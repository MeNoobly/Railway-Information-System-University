import React, { FC, useContext } from "react";
import { useQuery } from "react-query";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import RidesList from "../components/RidesList";

const Main: FC = observer(() => {
    const { rides } = useContext(Context);

    const { data, isLoading, isError } = useQuery(
        ["rides"],
        () => rides.getRides(),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return <h3 style={{ textAlign: "center" }}>Идёт загрузка...</h3>;
    }

    if (isError) {
        return (
            <h3 style={{ textAlign: "center" }}>Ошибка при получении данных</h3>
        );
    }

    if (!data) {
        return <h3 style={{ textAlign: "center" }}>Нет данных</h3>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Список маршрутов</h1>
            <RidesList list={data} />
        </div>
    );
});

export default Main;
