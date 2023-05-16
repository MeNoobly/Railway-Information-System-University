import React, { FC } from "react";
import TrainsAdmin from "./admin/trains/TrainsAdmin";
import { Container } from "react-bootstrap";

const Admin: FC = () => {
    return (
        <Container>
            <TrainsAdmin />
        </Container>
    );
};

export default Admin;
