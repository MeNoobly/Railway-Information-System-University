import React, { FC } from "react";
import { IRidesItemProps } from "../types/props/rides";
import { Col, Row } from "react-bootstrap";
import { normaliseDate } from "../functions/date";

const RidesItem: FC<IRidesItemProps> = ({ ride }) => {
    return (
        <Row>
            <Col>{normaliseDate(ride._departure_date)}</Col>
            <Col>{normaliseDate(ride._arrival_date)}</Col>
            <Col>{ride._departure_city}</Col>
            <Col>{ride._arrival_city}</Col>
            <Col>{ride._train_name}</Col>
            <Col>{ride.long_course_suburban}</Col>
        </Row>
    );
};

export default RidesItem;
