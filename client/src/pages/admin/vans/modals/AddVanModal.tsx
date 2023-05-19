import React, { FC, useContext, useEffect, useState } from "react";
import { IVanModalsProps } from "../../../../types/props/modals";
import { createVan } from "../../../../http/vansAPI";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../../..";
import { getTrains } from "../../../../http/trainsAPI";
import { ITrain } from "../../../../types/main/trains";

const AddVanModal: FC<IVanModalsProps> = ({ show, handleClose }) => {
    const { trains } = useContext(Context);

    const [capacity, setCapacity] = useState("");
    const [reserved, setReserved] = useState("");
    const [trainId, setTrainId] = useState(0);

    useEffect(() => {
        getTrains().then((data) => (trains.trains = data as ITrain[]));
    }, [trains]);

    const addVan = () => {
        createVan({
            capacity: +capacity,
            reserved: +reserved,
            train_id: trainId,
        }).then(() => {
            setCapacity("");
            setReserved("");
            handleClose();
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить вагон</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите вместительность вагона"
                        value={capacity}
                        onChange={(event) => setCapacity(event.target.value)}
                        className="mb-2"
                    />
                    <Form.Control
                        placeholder="Введите количество занятых мест"
                        value={reserved}
                        onChange={(event) => setReserved(event.target.value)}
                    />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {trains.selectedTrain || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {trains.trains.map((item) => (
                                <Dropdown.Item
                                    onClick={() => {
                                        setTrainId(item.id as number);
                                        trains.selectedTrain = item.train_name;
                                    }}
                                    key={item.id}
                                >
                                    {item.train_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addVan}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddVanModal;
