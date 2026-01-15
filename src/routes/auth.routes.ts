import express from "express";
import * as authController from "../controllers/auth.controller";
import { validateRequest } from "@/middlewares/requestValidator.middleware";
import { loginSchema, registerSchema } from "@/requests/authRequests";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = express.Router();

router.post("/login", validateRequest(loginSchema), authController.login);
router.post(
    "/register",
    validateRequest(registerSchema),
    authController.registerAdminAndCompany
);

router.get("/me", authMiddleware, authController.getMe);
router.delete("/logout", authController.logout);

export default router;
