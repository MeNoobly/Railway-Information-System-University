import React, { FC, useContext, useState } from "react";
import { ITrainsItemProps } from "../../../types/props/trains";
import { Button, Col, Row } from "react-bootstrap";
import { deleteTrain } from "../../../http/trainsAPI";
import ChangeTrainModal from "./modals/ChangeTrainModal";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const TrainsItem: FC<ITrainsItemProps> = observer(({ item }) => {
    const { trains } = useContext(Context);

    const [trainChangeVisible, setTrainChangeVisible] = useState(false);

    return (
        <>
            <Row className="mb-3">
                <Col md={3}>{item.train_name}</Col>
                <Col md={3}>{item.number_of_vans}</Col>
                <Col md={1}>
                    <Button
                        variant="primary"
                        onClick={async () => {
                            setTrainChangeVisible(true);
                        }}
                    >
                        Изменить
                    </Button>
                </Col>
                <Col md={2}>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteTrain(item);
                            trains.trains = trains.trains.filter(
                                (train) => train.id !== item.id
                            );
                        }}
                    >
                        Удалить
                    </Button>
                </Col>
            </Row>
            <ChangeTrainModal
                id={item.id as number}
                show={trainChangeVisible}
                handleClose={() => setTrainChangeVisible(false)}
                defaultTrainName={item.train_name}
                defaultNumberOfVans={item.number_of_vans}
            />
        </>
    );
});

export default TrainsItem;
