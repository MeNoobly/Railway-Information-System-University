import ApiError from "../error/ApiError.js";
import {
    createVanModel,
    deleteVanModel,
    getAllVansModel,
    updateVanModel,
} from "../models/vansModel.js";

class vansController {
    async getAllVans(request, response, next) {
        try {
            const data = await getAllVansModel();
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при получении вагона: ${error}`
                )
            );
        }
    }

    async createVan(request, response, next) {
        const { capacity, reserved, train_id } = request.body;

        try {
            const data = await createVanModel(capacity, reserved, train_id);
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при создании поезда: ${error}`
                )
            );
        }
    }

    async updateVan(request, response, next) {
        const { id, capacity, reserved, train_id } = request.body;

        try {
            const data = await updateVanModel(id, capacity, reserved, train_id);
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при обновлении поезда: ${error}`
                )
            );
        }
    }

    async deleteVan(request, response, next) {
        const { id } = request.body;

        try {
            const data = await deleteVanModel(id);
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при удалении поезда: ${error}`
                )
            );
        }
    }
}

export default new vansController();
