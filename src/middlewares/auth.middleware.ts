import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";
import { JwtUserPayload } from "@/types/jwt.type";

export const authMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const token = req.cookies.access_token;

    if (!token) {
        throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        );

        req.user = decoded as JwtUserPayload; // attach user info to request
        next();
    } catch (err) {
        throw new HttpError("Invalid token", StatusCodes.UNAUTHORIZED);
    }
};
