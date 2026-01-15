import { validateRequest } from "@/middlewares/requestValidator.middleware";
import { registerUserSchema } from "@/requests/userRequests.ts/registerUser.schema";
import * as userController from "@/controllers/user.controller";
import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { getUserSchema } from "@/requests/userRequests.ts/getUser.schema";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequest(registerUserSchema),
    userController.create
);

router.get("/", authMiddleware, userController.getUsersInCompany);

router.get(
    "/:id",
    authMiddleware,
    validateRequest(getUserSchema),
    userController.getUser
);

router.delete(
    "/:id",
    authMiddleware,
    validateRequest(getUserSchema),
    userController.deleteUser
);

export default router;
