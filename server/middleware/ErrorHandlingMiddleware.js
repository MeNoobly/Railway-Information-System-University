import ApiError from "../error/ApiError.js";

export default function (error, request, response, next) {
    if (error instanceof ApiError) {
        return response.status(error.status).json(error.message);
    }

    return response.status(500).json("Непредвиденная ошибка");
}
