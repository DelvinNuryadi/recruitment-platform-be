import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import positionRouter from "./position.routes";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/positions", positionRouter);
export default router;
