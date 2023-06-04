import express from "express";
import vansController from "../controllers/vansController.js";

const router = express();

router.get("/all", vansController.getAllVans);
router.post("/create", vansController.createVan);
router.post("/update", vansController.updateVan);
router.post("/delete", vansController.deleteVan);

export default router;
