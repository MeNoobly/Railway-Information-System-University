import express from "express";
import userRouter from "./userRouter.js";
import ridesRouter from "./ridesRouter.js";

const router = express();

router.use("/user", userRouter);
router.use("/routes", ridesRouter);

export default router;
