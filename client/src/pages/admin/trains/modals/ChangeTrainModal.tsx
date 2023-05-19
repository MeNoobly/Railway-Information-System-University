import React, { FC, useContext, useState } from "react";
import { ITrainModalsProps } from "../../../../types/props/modals";
import { Button, Form, Modal } from "react-bootstrap";
import { changeTrain } from "../../../../http/trainsAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../../..";

const ChangeTrainModal: FC<ITrainModalsProps> = observer(
    ({ show, handleClose, id, defaultTrainName, defaultNumberOfVans }) => {
        const { trains } = useContext(Context);

        const [trainName, setTrainName] = useState(defaultTrainName);
        const [numberOfVans, setNumberOfVans] = useState(defaultNumberOfVans);

        const changeTrainState = () => {
            changeTrain({
                id: id,
                train_name: trainName as string,
                number_of_vans: numberOfVans as string,
            }).then(() => {
                setTrainName("");
                setNumberOfVans("");
                handleClose();
            });
        };

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить поезд</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            placeholder="Введите название поезда"
                            value={trainName}
                            onChange={(event) =>
                                setTrainName(event.target.value)
                            }
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
                    <Button
                        variant="outline-success"
                        onClick={changeTrainState}
                    >
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
);

export default ChangeTrainModal;
