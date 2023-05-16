import React, { FC, useState } from "react";
import { ITrainsItemsProps } from "../../../types/props/trains";
import { Button, Col, Row } from "react-bootstrap";
import { deleteTrain } from "../../../http/trainsAPI";
import ChangeTrainModal from "./modals/ChangeTrainModal";

const TrainsItem: FC<ITrainsItemsProps> = ({ item }) => {
    const [trainChangeVisible, setTrainChangeVisible] = useState(false);

    return (
        <>
            <Row className="mb-3">
                <Col md={3}>{item.train_name}</Col>
                <Col md={3}>{item.number_of_vans}</Col>
                <Col md={1}>
                    <Button
                        variant="primary"
                        onClick={() => setTrainChangeVisible(true)}
                    >
                        Изменить
                    </Button>
                </Col>
                <Col md={2}>
                    <Button variant="danger" onClick={() => deleteTrain()}>
                        Удалить
                    </Button>
                </Col>
            </Row>
            <ChangeTrainModal
                show={trainChangeVisible}
                handleClose={() => setTrainChangeVisible(false)}
            />
        </>
    );
};

export default TrainsItem;
