import React, { FC, useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { IUser } from "../types/main/user";

const Profile: FC = () => {
    const { user } = useContext(Context);

    return (
        <>
            <Container>
                <h2 className="mt-2" style={{ textAlign: "center" }}>
                    Профиль
                </h2>
                <div className="mt-2 mb-2">
                    <p>
                        <b>Логин пользователя: </b>
                        {(user.user as IUser).login}
                    </p>
                </div>
                <div className="mt-2 mb-2">
                    <p>
                        <b>Роль пользователя: </b>
                        {(user.user as IUser).role}
                    </p>
                </div>
            </Container>
        </>
    );
};

export default Profile;
