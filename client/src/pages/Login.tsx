import React, { FC, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { useForm, SubmitHandler } from "react-hook-form";
import { MAIN_PATH } from "../utils/consts";
import { ILoginFields } from "../types/forms/login";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { IUser } from "../types/main/user";

const Login: FC = observer(() => {
    const navigate = useNavigate();
    const { user } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        setError,
    } = useForm<ILoginFields>({ mode: "onChange" });

    const loginHandler = async () => {
        try {
            const values = getValues();
            const data = await login(values.login, values.password);
            user.user = data as IUser;
            if ((user.user as IUser).role === "ADMIN") {
                user.isAdmin = true;
            }
            localStorage.setItem("user", JSON.stringify(data));
            user.isAuth = true;
            reset();
            navigate(MAIN_PATH);
        } catch (error: Error | unknown) {
            setError("password", {
                type: "custom",
                message: "Invalid password entered",
            });
        }
    };

    const onSumbit: SubmitHandler<ILoginFields> = () => {
        loginHandler();
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
                        <div style={{ color: "red" }} className="mb-3">
                            {errors.login.message}
                        </div>
                    )}
                    <Form.Group className="mb-3">
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
                        <div style={{ color: "red" }} className="mb-3">
                            {errors.password.message}
                        </div>
                    )}
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>
            </Container>
        </>
    );
});

export default Login;
