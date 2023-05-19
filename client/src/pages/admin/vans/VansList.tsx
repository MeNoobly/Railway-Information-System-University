import React, { FC, useState } from "react";
import { IVansListProps } from "../../../types/props/vans";
import { Row, Col, Button } from "react-bootstrap";
import VansItem from "./VansItem";
import AddVanModal from "./modals/AddVanModal";

const VansList: FC<IVansListProps> = ({ list }) => {
    const [vanAddVisible, setVanAddVisible] = useState(false);

    return (
        <div>
            <Row className="mt-4 mb-4">
                <Col md={2}>
                    <b>Вагоны</b>
                </Col>
                <Col md={2}>
                    <Button
                        variant="success"
                        onClick={() => setVanAddVisible(true)}
                    >
                        Добавить вагон
                    </Button>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={3}>
                    <b>Количество мест</b>
                </Col>
                <Col md={3}>
                    <b>Количество занятых мест</b>
                </Col>
                <Col md={3}>
                    <b>Название поезда</b>
                </Col>
            </Row>
            <div
                style={{ border: "3px solid lightgray" }}
                className="pt-2 pb-2 pl-2 pr-2"
            >
                {list.map((item) => (
                    <VansItem item={item} key={item.id} />
                ))}
            </div>
            <AddVanModal
                show={vanAddVisible}
                handleClose={() => setVanAddVisible(false)}
            />
        </div>
    );
};

export default VansList;
