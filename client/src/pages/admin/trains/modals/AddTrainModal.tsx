import React, { FC, useState } from "react";
import { createTrain } from "../../../../http/trainsAPI";
import { Button, Form, Modal } from "react-bootstrap";
import { ITrainModalsProps } from "../../../../types/props/modals";

const AddTrainModal: FC<ITrainModalsProps> = ({ show, handleClose }) => {
    const [trainName, setTrainName] = useState("");
    const [numberOfVans, setNumberOfVans] = useState("");

    const addTrain = () => {
        createTrain().then((data) => {
            setTrainName("");
            setNumberOfVans("");
            handleClose();
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить поезд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название поезда"
                        value={trainName}
                        onChange={(event) => setTrainName(event.target.value)}
                        className="mb-2"
                    />
                    <Form.Control
                        placeholder="Введите количество вагонов поезда"
                        value={numberOfVans}
                        onChange={(event) =>
                            setNumberOfVans(event.target.value)
                        }
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addTrain}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTrainModal;
