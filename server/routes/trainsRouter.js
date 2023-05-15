import express from "express";
import trainsController from "../controllers/trainsController.js";

const router = express();

router.get("/all", trainsController.getAllTrains);
router.post("/create", trainsController.createTrain);
router.post("/update", trainsController.updateTrain);
router.post("/delete", trainsController.deleteTrain);

export default router;
