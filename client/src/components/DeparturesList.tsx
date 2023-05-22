import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IDeparturesListProps } from "../types/props/departures";
import DeparturesItem from "./DeaprturesItem";

const RidesList: FC<IDeparturesListProps> = ({ list }) => {
    return (
        <div>
            <Container
                style={{ border: "3px solid lightgray" }}
                className="mt-4"
            >
                <Row className="mb-4">
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
                {list.map((item, index) => (
                    <DeparturesItem ride={item} key={index} />
                ))}
            </Container>
        </div>
    );
};

export default RidesList;
