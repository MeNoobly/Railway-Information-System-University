import express from "express";
import trainsController from "../controllers/trainsController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = express();

router.get("/all", trainsController.getAllTrains);
router.post("/one", trainsController.getOneTrain);
router.post(
    "/create",
    checkRoleMiddleware("ADMIN"),
    trainsController.createTrain
);
router.post(
    "/update",
    checkRoleMiddleware("ADMIN"),
    trainsController.updateTrain
);
router.post(
    "/delete",
    checkRoleMiddleware("ADMIN"),
    trainsController.deleteTrain
);

export default router;
