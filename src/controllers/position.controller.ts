import { createPositionBodyRequest } from "@/types/position.type";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as positionService from "../services/position.service";
import { AuthRequest } from "@/types/auth.type";

export const createPosition = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user as AuthRequest;
        const data = res.locals.parsed.body as createPositionBodyRequest;

        const result = await positionService.createPosition(userId, data);

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "position created successfully", data: result });
    } catch (error) {
        next(error);
    }
};

export const getAllPositions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user as AuthRequest;
        const result = await positionService.getAllPositions(id);
        return res
            .status(StatusCodes.OK)
            .json({ message: "retrieve positions successfully", data: result });
    } catch (error) {
        next(error);
    }
};

export const getPosition = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: positionId } = res.locals.parsed.params;
        const { id: userId } = req.user as AuthRequest;
        const result = await positionService.getPosition(userId, positionId);
        return res
            .status(StatusCodes.OK)
            .json({ message: "retrieve position successfully", data: result });
    } catch (error) {
        next(error);
    }
};

export const updatePosition = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // const { id: positionId } = res.locals.parsed.params;
        // const { id: userId } = req.user as AuthRequest;
        return res
            .status(StatusCodes.OK)
            .json({ message: "update position successfully" });
    } catch (error) {
        next(error);
    }
};
