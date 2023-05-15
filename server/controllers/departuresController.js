import ApiError from "../error/ApiError.js";
import { getDeparturesModel } from "../models/departuresModel.js";

class departuresController {
    async getAllDepartures(request, response, next) {
        try {
            const data = await getDeparturesModel();
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при получении отправлений: ${error}`
                )
            );
        }
    }
}

export default new departuresController();
