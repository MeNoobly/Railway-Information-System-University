import express from "express";
import userController from "../controllers/userController.js";

const router = express();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", userController.check);
router.get("/all", userController.getAllUsers);
router.post("/update", userController.updateUser);
router.post("/delete", userController.deleteUser);

export default router;
