import {
    GetMeRequest,
    LoginBodyRequest,
    RegisterAdminAndCompanyBodyRequest,
} from "@/types/auth.type";
import * as authService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

export const login = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = res.locals.parsed.body as LoginBodyRequest;

        const result = await authService.login(data);
        res.cookie("access_token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({
            message: "Login successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const registerAdminAndCompany = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = res.locals.parsed
            .body as RegisterAdminAndCompanyBodyRequest;

        const result = await authService.registerUserAndCompany(data);

        return res.json({
            message: "Company and Admin register successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.user as GetMeRequest;
        const result = await authService.getMe(data);
        return res.json({
            message: "profile retrieved",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.clearCookie("access_token");

        return res.json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};
