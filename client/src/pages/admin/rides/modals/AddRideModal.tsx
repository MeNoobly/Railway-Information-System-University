import React, { FC, useContext, useEffect, useState } from "react";
import { IRideModalsProps } from "../../../../types/props/modals";
import { Modal, Dropdown, Button, Form } from "react-bootstrap";
import { Context } from "../../../..";
import { IRide } from "../../../../types/main/rides";
import { createRide, getRides } from "../../../../http/ridesAPI";
import { observer } from "mobx-react-lite";

const AddRideModal: FC<IRideModalsProps> = observer(({ show, handleClose }) => {
    const { rides, trains } = useContext(Context);

    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [trainId, setTrainId] = useState(0);

    useEffect(() => {
        getRides().then((data) => (rides.rides = data as IRide[]));
    }, [rides]);

    const addVan = () => {
        createRide({
            departure_date: departureDate,
            arrival_date: arrivalDate,
            departure_city: departureCity,
            arrival_city: arrivalCity,
            train_id: trainId,
        }).then(() => {
            setDepartureDate("");
            setArrivalDate("");
            setDepartureCity("");
            setArrivalCity("");
            handleClose();
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить путь</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите дату отправления в формате 'MM/DD/YY HH:MM'"
                        value={departureDate}
                        onChange={(event) =>
                            setDepartureDate(event.target.value)
                        }
                        className="mb-2"
                    />
                    <Form.Control
                        placeholder="Введите дату прибытия в формате 'MM/DD/YY HH:MM'"
                        value={arrivalDate}
                        onChange={(event) => setArrivalDate(event.target.value)}
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
                        onChange={(event) => setArrivalCity(event.target.value)}
                    />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {trains.selectedTrain || "Выберите поезд"}
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
});

export default AddRideModal;
