import { RegisterAdminAndCompanyBodyRequest } from "@/types/auth.type";
import * as authService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

export const login = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "login work" });
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = res.locals.parsed
            .body as RegisterAdminAndCompanyBodyRequest;

        const result = await authService.registerUserAndCompany(data);

        res.json({
            message: "register works",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
