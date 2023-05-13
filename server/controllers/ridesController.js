import ApiError from "../error/ApiError.js";
import { getRidesModel } from "../models/ridesModel.js";

class ridesController {
    async getRides(request, response, next) {
        try {
            const data = await getRidesModel();
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при получении маршрутов: ${error}`
                )
            );
        }
    }
}

export default new ridesController();
