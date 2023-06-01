import express from "express";
import vansController from "../controllers/vansController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = express();

router.get("/all", vansController.getAllVans);
router.post("/create", checkRoleMiddleware("ADMIN"), vansController.createVan);
router.post("/update", checkRoleMiddleware("ADMIN"), vansController.updateVan);
router.post("/delete", checkRoleMiddleware("ADMIN"), vansController.deleteVan);

export default router;
