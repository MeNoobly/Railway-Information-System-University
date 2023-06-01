import express from "express";
import ridesController from "../controllers/ridesController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = express();

router.get("/all", ridesController.getAllRides);
router.post(
    "/create",
    checkRoleMiddleware("ADMIN"),
    ridesController.createRide
);
router.post(
    "/update",
    checkRoleMiddleware("ADMIN"),
    ridesController.updateRide
);
router.post(
    "/delete",
    checkRoleMiddleware("ADMIN"),
    ridesController.deleteRide
);

export default router;
