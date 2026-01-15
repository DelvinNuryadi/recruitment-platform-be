import { CreateUserBodyRequest } from "@/types/user.type";
import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { AuthRequest } from "@/types/auth.type";

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user as AuthRequest;
        const data = res.locals.parsed.body as CreateUserBodyRequest;
        const payload = { ...data, userId: id };

        const result = await userService.createUser(payload);

        return res.json({
            message: "user registered successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getUsersInCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user as AuthRequest;
        const result = await userService.getUserInCompany(id);
        return res.json({
            message: "users retrived successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = res.locals.parsed.params as AuthRequest;
        const result = await userService.getUser(id);
        return res.json({
            message: "user retrived successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = res.locals.parsed.params as AuthRequest;
        const result = await userService.deleteUser(id);
        return res.json({
            message: "user deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
