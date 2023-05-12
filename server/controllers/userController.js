import ApiError from "../error/ApiError.js";
import { createUserModel, getOneUserModel } from "../models/userModel.js";
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

        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный логин или пароль"));
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
    }

    async login(request, response, next) {
        const { login, password } = request.body;
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
    }

    async check(request, response, next) {
        const token = generateJWT(request.user.id, request.user.email);

        return response.json({ token });
    }
}

export default new userController();
