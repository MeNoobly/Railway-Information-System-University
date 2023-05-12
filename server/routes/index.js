import express from "express";
import userRouter from "./userRouter.js";

const router = express();

router.use("/user", userRouter);

export default router;
