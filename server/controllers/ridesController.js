import ApiError from "../error/ApiError.js";
import {
    createRideModel,
    deleteRideModel,
    getAllRidesModel,
    updateRideModel,
} from "../models/ridesModel.js";

class ridesController {
    async getAllRides(request, response, next) {
        try {
            const data = await getAllRidesModel();
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при получении поездок: ${error}`
                )
            );
        }
    }

    async createRide(request, response, next) {
        const {
            departure_date,
            arrival_date,
            departure_city,
            arrival_city,
            train_id,
        } = request.body;

        try {
            const data = await createRideModel(
                departure_date,
                arrival_date,
                departure_city,
                arrival_city,
                train_id
            );
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при создании поездки: ${error}`
                )
            );
        }
    }

    async updateRide(request, response, next) {
        const {
            id,
            departure_date,
            arrival_date,
            departure_city,
            arrival_city,
            train_id,
        } = request.body;

        try {
            const data = await updateRideModel(
                id,
                departure_date,
                arrival_date,
                departure_city,
                arrival_city,
                train_id
            );
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при обновлении поезда: ${error}`
                )
            );
        }
    }

    async deleteRide(request, response, next) {
        const { id } = request.body;

        try {
            const data = await deleteRideModel(id);
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

export default new ridesController();
