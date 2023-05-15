import express from "express";
import departuresController from "../controllers/departuresController.js";

const router = express();

router.get("/all", departuresController.getAllDepartures);

export default router;
