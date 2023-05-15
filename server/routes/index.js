import express from "express";
import userRouter from "./userRouter.js";
import ridesRouter from "./ridesRouter.js";
import trainsRouter from "./trainsRouter.js";
import vansRouter from "./vansRouter.js";

const router = express();

router.use("/user", userRouter);
router.use("/routes", ridesRouter);
router.use("/trains", trainsRouter);
router.use("/vans", vansRouter);
router.use("/rides", ridesRouter);

export default router;
