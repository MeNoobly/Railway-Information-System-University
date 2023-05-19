import React, { FC } from "react";
import TrainsAdmin from "./admin/trains/TrainsAdmin";
import { Container } from "react-bootstrap";
import VansAdmin from "./admin/vans/VansAdmin";

const Admin: FC = () => {
    return (
        <Container>
            <TrainsAdmin />
            <VansAdmin />
        </Container>
    );
};

export default Admin;
