import React, { FC, useContext, useEffect, useState } from "react";
import { IRidesItemProps } from "../../../types/props/rides";
import { Row, Col, Button } from "react-bootstrap";
import { Context } from "../../..";
import { getOneTrain } from "../../../http/trainsAPI";
import { ITrain } from "../../../types/main/trains";
import { deleteRide } from "../../../http/ridesAPI";
import { observer } from "mobx-react-lite";
import { normaliseDate, normaliseDateForChange } from "../../../functions/date";
import ChangeRideModal from "./modals/ChangeRideModal";

const RidesItem: FC<IRidesItemProps> = observer(({ item }) => {
    const { rides } = useContext(Context);

    const [ridesChangeVisible, setRidesChangeVisible] = useState(false);

    const [trainName, setTrainName] = useState("");

    useEffect(() => {
        getOneTrain(item.train_id as number).then((data: ITrain[]) =>
            data.forEach((item) => setTrainName(item.train_name))
        );
    }, [item.train_id]);

    return (
        <>
            <Row className="mb-3">
                <Col md={2}>{normaliseDate(item.departure_date)}</Col>
                <Col md={2}>{normaliseDate(item.arrival_date)}</Col>
                <Col md={2}>{item.departure_city}</Col>
                <Col md={2}>{item.arrival_city}</Col>
                <Col md={2}>{trainName}</Col>
                <Col md={1}>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setRidesChangeVisible(true);
                        }}
                    >
                        Изменить
                    </Button>
                </Col>
                <Col md={1}>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteRide(item);
                            rides.rides = rides.rides.filter(
                                (ride) => ride.id !== item.id
                            );
                        }}
                    >
                        Удалить
                    </Button>
                </Col>
            </Row>
            <ChangeRideModal
                id={item.id as number}
                show={ridesChangeVisible}
                handleClose={() => setRidesChangeVisible(false)}
                defaultDepartureCity={item.departure_city}
                defaultArrivalCity={item.arrival_city}
                defaultDepartureDate={normaliseDateForChange(
                    item.departure_date
                )}
                defaultArrivalDate={normaliseDateForChange(item.arrival_date)}
                defaultTrainId={item.train_id}
            />
        </>
    );
});

export default RidesItem;
