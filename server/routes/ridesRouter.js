import express from "express";
import ridesController from "../controllers/ridesController.js";

const router = express();

router.get("/all", ridesController.getRides);

export default router;
