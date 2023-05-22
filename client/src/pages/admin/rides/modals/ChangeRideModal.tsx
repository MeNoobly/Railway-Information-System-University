import React, { FC, useContext, useEffect, useState } from "react";
import { IRideModalsProps } from "../../../../types/props/modals";
import { observer } from "mobx-react-lite";
import { Context } from "../../../..";
import { getOneTrain } from "../../../../http/trainsAPI";
import { ITrain } from "../../../../types/main/trains";
import { changeRide } from "../../../../http/ridesAPI";
import { Modal, Dropdown, Button, Form } from "react-bootstrap";
import { normaliseDateForDB } from "../../../../functions/date";

const ChangeRideModal: FC<IRideModalsProps> = observer(
    ({
        show,
        handleClose,
        id,
        defaultDepartureCity,
        defaultArrivalCity,
        defaultDepartureDate,
        defaultArrivalDate,
        defaultTrainId,
    }) => {
        const { trains } = useContext(Context);

        const [departureCity, setDepartureCity] =
            useState(defaultDepartureCity);
        const [arrivalCity, setArrivalCity] = useState(defaultArrivalCity);
        const [departureDate, setDepartureDate] =
            useState(defaultDepartureDate);
        const [arrivalDate, setArrivalDate] = useState(defaultArrivalDate);
        const [trainName, setTrainName] = useState("");
        const [trainId, setTrainId] = useState(defaultTrainId);

        useEffect(() => {
            getOneTrain(defaultTrainId as number).then((data: ITrain[]) =>
                data.forEach((item) => setTrainName(item.train_name))
            );
        }, [defaultTrainId]);

        const changeRideState = () => {
            changeRide({
                id,
                departure_date: normaliseDateForDB(departureDate as string),
                arrival_date: normaliseDateForDB(arrivalDate as string),
                departure_city: departureCity as string,
                arrival_city: arrivalCity as string,
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
                            placeholder="Введите дату отправления в формате 'MM-DD-YY HH-MM'"
                            value={departureDate}
                            onChange={(event) =>
                                setDepartureDate(event.target.value)
                            }
                            className="mb-2"
                        />
                        <Form.Control
                            placeholder="Введите дату прибытия в формате 'MM-DD-YY HH-MM'"
                            value={arrivalDate}
                            onChange={(event) =>
                                setArrivalDate(event.target.value)
                            }
                            className="mb-2"
                        />
                        <Form.Control
                            placeholder="Введите город отправления"
                            value={departureCity}
                            onChange={(event) =>
                                setDepartureCity(event.target.value)
                            }
                            className="mb-2"
                        />
                        <Form.Control
                            placeholder="Введите город прибытия"
                            value={arrivalCity}
                            onChange={(event) =>
                                setArrivalCity(event.target.value)
                            }
                            className="mb-2"
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
                    <Button variant="outline-success" onClick={changeRideState}>
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
);

export default ChangeRideModal;
