import React, { FC, useContext, useEffect, useState } from "react";
import { IVanModalsProps } from "../../../../types/props/modals";
import { observer } from "mobx-react-lite";
import { Context } from "../../../..";
import { getOneTrain } from "../../../../http/trainsAPI";
import { ITrain } from "../../../../types/main/trains";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { changeVan } from "../../../../http/vansAPI";

const ChangeVanModal: FC<IVanModalsProps> = observer(
    ({
        show,
        handleClose,
        id,
        defaultCapacity,
        defaultReserved,
        defaultTrainId,
    }) => {
        const { trains } = useContext(Context);

        const [capacity, setCapacity] = useState(defaultCapacity);
        const [reserved, setReserved] = useState(defaultReserved);
        const [trainName, setTrainName] = useState("");
        const [trainId, setTrainId] = useState(defaultTrainId);

        useEffect(() => {
            getOneTrain(defaultTrainId as number).then((data: ITrain[]) =>
                data.forEach((item) => setTrainName(item.train_name))
            );
        }, [defaultTrainId]);

        const changeVanState = () => {
            changeVan({
                id,
                capacity: capacity as number,
                reserved: reserved as number,
                train_id: trainId as number,
            }).then(() => {
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
                            placeholder="Введите вместительность вагона"
                            value={capacity}
                            onChange={(event) =>
                                setCapacity(+event.target.value)
                            }
                            className="mb-2"
                        />
                        <Form.Control
                            placeholder="Введите количество занятых мест"
                            value={reserved}
                            onChange={(event) =>
                                setReserved(+event.target.value)
                            }
                        />
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>
                                {trains.selectedTrain || trainName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {trains.trains.map((item) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            setTrainId(item.id as number);
                                            trains.selectedTrain =
                                                item.train_name;
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
                    <Button variant="outline-success" onClick={changeVanState}>
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
);

export default ChangeVanModal;
