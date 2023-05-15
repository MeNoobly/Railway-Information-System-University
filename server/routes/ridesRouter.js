import express from "express";
import ridesController from "../controllers/ridesController.js";

const router = express();

router.get("/all", ridesController.getAllRides);
router.post("/create", ridesController.createRide);
router.post("/update", ridesController.updateRide);
router.post("/delete", ridesController.deleteRide);

export default router;
