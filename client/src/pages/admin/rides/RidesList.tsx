import React, { FC, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IRidesListProps } from "../../../types/props/rides";
import RidesItem from "./RidesItem";
import { observer } from "mobx-react-lite";
import AddRideModal from "./modals/AddRideModal";

const RidesList: FC<IRidesListProps> = observer(({ list }) => {
    const [ridesAddVisible, setRidesAddVisible] = useState(false);

    return (
        <div>
            <Row className="mt-4 mb-4">
                <Col md={2}>
                    <b>Пути</b>
                </Col>
                <Col md={2}>
                    <Button
                        variant="success"
                        onClick={() => setRidesAddVisible(true)}
                    >
                        Добавить путь
                    </Button>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={2}>
                    <b>Дата отправления</b>
                </Col>
                <Col md={2}>
                    <b>Дата прибытия</b>
                </Col>
                <Col md={2}>
                    <b>Город отправления</b>
                </Col>
                <Col md={2}>
                    <b>Город прибытия</b>
                </Col>
                <Col md={2}>
                    <b>Название поезда</b>
                </Col>
            </Row>
            <div
                style={{ border: "3px solid lightgray" }}
                className="pt-2 pb-2 pl-2 pr-2"
            >
                {list.map((item) => (
                    <RidesItem item={item} key={item.id} />
                ))}
            </div>
            <AddRideModal
                show={ridesAddVisible}
                handleClose={() => setRidesAddVisible(false)}
            />
        </div>
    );
});

export default RidesList;
