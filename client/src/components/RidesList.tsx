import React, { FC } from "react";
import { IRidesItemListProps } from "../types/props/rides";
import RidesItem from "./RidesItem";
import { Col, Container, Row } from "react-bootstrap";

const RidesList: FC<IRidesItemListProps> = ({ list }) => {
    return (
        <div>
            <Container
                style={{ border: "3px solid lightgray" }}
                className="mt-4"
            >
                <Row className=" mb-3">
                    <Col>
                        <b>Дата выезда</b>
                    </Col>
                    <Col>
                        <b>Дата приезда</b>
                    </Col>
                    <Col>
                        <b>Город выезда</b>
                    </Col>
                    <Col>
                        <b>Город приезда</b>
                    </Col>
                    <Col>
                        <b>Название поезда</b>
                    </Col>
                    <Col>
                        <b>Тип поездки</b>
                    </Col>
                </Row>
                {list.map((item) => (
                    <RidesItem ride={item} key={Date.now()} />
                ))}
            </Container>
        </div>
    );
};

export default RidesList;
