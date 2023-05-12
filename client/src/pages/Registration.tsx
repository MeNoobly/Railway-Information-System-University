import React, { FC } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { IRegistrationFields } from "../types/forms/registration";
import { LOGIN_PATH } from "../utils/consts";
import { registration } from "../http/userAPI";

const Registration: FC = observer(() => {
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<IRegistrationFields>({ mode: "onChange" });

    const registrationHandler = async () => {
        try {
            const values = getValues();
            const data = await registration(values.login, values.password);
            navigate(LOGIN_PATH);
        } catch (error: Error | unknown) {
            alert(error);
        }
    };

    const onSumbit: SubmitHandler<IRegistrationFields> = (data) => {
        registrationHandler();
        reset();
    };

    return (
        <>
            <Container>
                <Form className="mt-4" onSubmit={handleSubmit(onSumbit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите логин"
                            {...register("login", {
                                required: "Login is require field!",
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Please enter valid login!",
                                },
                            })}
                        />
                    </Form.Group>
                    {errors.login && (
                        <div className="mb-3 text-danger">
                            {errors.login.message}
                        </div>
                    )}
                    <Form.Group className="mb-3 mt-2">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            {...register("password", {
                                required: "Password is require field!",
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Please enter valid password!",
                                },
                            })}
                        />
                    </Form.Group>
                    {errors.password && (
                        <div className="mb-3 text-danger">
                            {errors.password.message}
                        </div>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Подтвердите пароль"
                            {...register("repeatPassword", {
                                required: "Password is require field!",
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Please enter valid password!",
                                },
                                validate: (item: string) => {
                                    if (watch("password") !== item) {
                                        return "Your passwords don't match";
                                    }
                                },
                            })}
                        />
                    </Form.Group>
                    {errors.repeatPassword && (
                        <div className="mb-3 mt-2 text-danger">
                            {errors.repeatPassword.message}
                        </div>
                    )}
                    <Button variant="primary" type="submit">
                        Зарегистрироваться
                    </Button>
                </Form>
            </Container>
        </>
    );
});

export default Registration;
