import React, { FC, useContext } from "react";
import { IContext } from "../types/context/context";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import {
    Navbar,
    Container,
    DropdownButton,
    Dropdown,
    Nav,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";

const NavBar: FC = observer(() => {
    const { user } = useContext<IContext>(Context);
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        Railway Information System
                    </Navbar.Brand>
                    {user.isAuth ? (
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Настройки"
                            variant="secondary"
                            menuVariant="dark"
                        >
                            {user.isAdmin && (
                                <Dropdown.Item
                                    onClick={() => navigate("/admin")}
                                >
                                    Админ панель
                                </Dropdown.Item>
                            )}
                            <Dropdown.Item onClick={() => navigate("/profile")}>
                                Профиль
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => navigate("/favourites")}
                            >
                                Избранное
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    navigate("/");
                                    user.isAuth = false;
                                }}
                            >
                                Выйти
                            </Dropdown.Item>
                        </DropdownButton>
                    ) : (
                        <Nav className="ml-auto">
                            <Nav.Link href="/login">Войти</Nav.Link>
                            <Nav.Link href="/registration">
                                Зарегистрироваться
                            </Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;
