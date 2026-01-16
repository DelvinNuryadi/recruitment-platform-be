import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import positionRouter from "./position.routes";
import applicantRouter from "./applicant.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/positions", positionRouter);
router.use("/applicants", applicantRouter);

export default router;
