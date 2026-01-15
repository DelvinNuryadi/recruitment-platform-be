import { validateRequest } from "@/middlewares/requestValidator.middleware";
import { createPositionSchema, getPositionSchema } from "@/requests/positions";
import * as positionController from "../controllers/position.controller";
import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { updatePositionSchema } from "@/requests/positions/updatePosition.schema";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    validateRequest(createPositionSchema),
    positionController.createPosition
);

router.get("/", authMiddleware, positionController.getAllPositions);

router.get(
    "/:id",
    authMiddleware,
    validateRequest(getPositionSchema),
    positionController.getPosition
);

router.put(
    "/:id",
    authMiddleware,
    validateRequest(updatePositionSchema),
    positionController.updatePosition
);

router.delete(
    "/:id",
    authMiddleware,
    validateRequest(getPositionSchema),
    positionController.deletePosition
);

export default router;
