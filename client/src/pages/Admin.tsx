import React, { FC } from "react";
import TrainsAdmin from "./admin/trains/TrainsAdmin";
import { Container } from "react-bootstrap";
import VansAdmin from "./admin/vans/VansAdmin";
import RidesAdmin from "./admin/rides/RidesAdmin";

const Admin: FC = () => {
    return (
        <Container>
            <TrainsAdmin />
            <VansAdmin />
            <RidesAdmin />
        </Container>
    );
};

export default Admin;
