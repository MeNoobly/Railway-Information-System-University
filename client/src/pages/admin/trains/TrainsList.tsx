import React, { FC, useState } from "react";
import { ITrainsListProps } from "../../../types/props/trains";
import TrainsItem from "./TrainsItem";
import { Button, Col, Row } from "react-bootstrap";
import AddTrainModal from "./modals/AddTrainModal";

const TrainsList: FC<ITrainsListProps> = ({ list }) => {
    const [trainAddVisible, setTrainAddVisible] = useState(false);

    return (
        <div>
            <Row className="mt-4 mb-4">
                <Col md={2}>
                    <b>Поезда</b>
                </Col>
                <Col md={2}>
                    <Button
                        variant="success"
                        onClick={() => setTrainAddVisible(true)}
                    >
                        Добавить поезд
                    </Button>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={3}>
                    <b>Название поезда</b>
                </Col>
                <Col md={3}>
                    <b>Количество вагонов</b>
                </Col>
            </Row>
            <div
                style={{ border: "3px solid lightgray" }}
                className="pt-2 pb-2 pl-2 pr-2"
            >
                {list.map((item) => (
                    <TrainsItem item={item} key={item.id} />
                ))}
            </div>
            <AddTrainModal
                show={trainAddVisible}
                handleClose={() => setTrainAddVisible(false)}
            />
        </div>
    );
};

export default TrainsList;
