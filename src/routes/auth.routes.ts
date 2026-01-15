import express from "express";
import * as auth from "../controllers/auth.controller";
import { validateRequest } from "@/middlewares/requestValidator.middleware";
import { registerSchema } from "@/requests/authRequests";

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", validateRequest(registerSchema), auth.register);

export default router;
