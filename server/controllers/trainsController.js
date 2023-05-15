import ApiError from "../error/ApiError.js";
import {
    createTrainModel,
    deleteTrainModel,
    getAllTrainsModel,
    updateTrainModel,
} from "../models/trainsModel.js";

class trainsController {
    async getAllTrains(request, response, next) {
        try {
            const data = await getAllTrainsModel();
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при получении поездов: ${error}`
                )
            );
        }
    }

    async createTrain(request, response, next) {
        const { trainName, numberOfVans } = request.body;

        try {
            const data = await createTrainModel(trainName, numberOfVans);
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при создании поезда: ${error}`
                )
            );
        }
    }

    async updateTrain(request, response, next) {
        const { id, trainName, numberOfVans } = request.body;

        try {
            const data = await updateTrainModel(id, trainName, numberOfVans);
            return response.json(data);
        } catch (error) {
            return next(
                ApiError.badRequest(
                    `Произошла ошибка при обновлении поезда: ${error}`
                )
            );
        }
    }

    async deleteTrain(request, response, next) {
        const { id } = request.body;

        try {
            const data = await deleteTrainModel(id);
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

export default new trainsController();
