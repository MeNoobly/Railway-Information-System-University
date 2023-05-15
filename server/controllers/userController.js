import ApiError from "../error/ApiError.js";
import {
    createUserModel,
    deleteUserModel,
    getAllUsersModel,
    getOneUserModel,
    getOneUserModelId,
    updateUserModel,
} from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJWT = (id, login) => {
    return jwt.sign({ id, login }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class userController {
    async registration(request, response, next) {
        const { login, password } = request.body;

        try {
            if (!login || !password) {
                return next(
                    ApiError.badRequest("Некорректный логин или пароль")
                );
            }

            const dataCandidate = await getOneUserModel(login);
            const candidate = dataCandidate[0];

            if (candidate) {
                return next(
                    ApiError.badRequest(
                        "Пользователь с таким логином уже существует"
                    )
                );
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const dataUser = await createUserModel({
                login,
                password: hashPassword,
            });
            const user = dataUser[0];

            const token = generateJWT(user.id, user.login);

            return response.json({ token });
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при регистрации пользователя: ${error}`
                )
            );
        }
    }

    async login(request, response, next) {
        const { login, password } = request.body;

        try {
            const dataUser = await getOneUserModel(login);
            const user = dataUser[0];

            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден"));
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return next(ApiError.badRequest("Указан неверный пароль"));
            }

            const token = generateJWT(user.id, user.email, user.role);
            return response.json({ token });
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при входе пользователя: ${error}`
                )
            );
        }
    }

    async check(request, response, next) {
        const token = generateJWT(request.user.id, request.user.login);

        return response.json({ token });
    }

    async getAllUsers(request, response, next) {
        try {
            const data = await getAllUsersModel();
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при получении пользователей: ${error}`
                )
            );
        }
    }

    async updateUser(request, response, next) {
        const { id, login, password } = request.body;

        try {
            if (!login || !password) {
                return next(
                    ApiError.badRequest("Некорректный логин или пароль")
                );
            }

            const dataCandidate = await getOneUserModelId(id);
            const candidate = dataCandidate[0];

            if (!candidate) {
                return next(
                    ApiError.badRequest("Пользователя с таким id не существует")
                );
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const dataUser = await updateUserModel({
                id,
                login,
                password: hashPassword,
            });
            const user = dataUser[0];

            const token = generateJWT(user.id, user.login);

            return response.json({ token });
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при обновлении данных пользователя: ${error}`
                )
            );
        }
    }

    async deleteUser(request, response, next) {
        const { id } = request.body;

        try {
            const data = await deleteUserModel(id);
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при удалении пользователя: ${error}`
                )
            );
        }
    }
}

export default new userController();
