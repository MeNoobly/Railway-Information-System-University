import React, { FC, useContext, useEffect, useState } from "react";
import { IVansItemsProps } from "../../../types/props/vans";
import { Row, Col, Button } from "react-bootstrap";
import { Context } from "../../..";
import { deleteVan } from "../../../http/vansAPI";
import ChangeVanModal from "./modals/ChangeVanModal";
import { getOneTrain } from "../../../http/trainsAPI";
import { ITrain } from "../../../types/main/trains";

const VansItem: FC<IVansItemsProps> = ({ item }) => {
    const { vans } = useContext(Context);

    const [vanChangeVisible, setVanChangeVisible] = useState(false);
    const [trainName, setTrainName] = useState("");

    useEffect(() => {
        getOneTrain(item.train_id as number).then((data: ITrain[]) =>
            data.forEach((item) => setTrainName(item.train_name))
        );
    }, [item.train_id]);

    return (
        <>
            <Row className="mb-3">
                <Col md={3}>{item.capacity}</Col>
                <Col md={3}>{item.reserved}</Col>
                <Col md={3}>{trainName}</Col>
                <Col md={1}>
                    <Button
                        variant="primary"
                        onClick={async () => {
                            setVanChangeVisible(true);
                        }}
                    >
                        Изменить
                    </Button>
                </Col>
                <Col md={2}>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteVan(item);
                            vans.vans = vans.vans.filter(
                                (van) => van.id !== item.id
                            );
                        }}
                    >
                        Удалить
                    </Button>
                </Col>
            </Row>
            <ChangeVanModal
                id={item.id as number}
                show={vanChangeVisible}
                handleClose={() => setVanChangeVisible(false)}
                defaultCapacity={item.capacity}
                defaultReserved={item.reserved}
                defaultTrainId={item.train_id}
            />
        </>
    );
};

export default VansItem;
