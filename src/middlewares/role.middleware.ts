import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";

export const requireAdmin = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (!req.user || req.user.role !== "ADMIN") {
        throw new HttpError("Admin access required", StatusCodes.FORBIDDEN);
    }

    next();
};

export const requireRecruiter = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (
        !req.user ||
        (req.user.role !== "RECRUITER" && req.user.role !== "ADMIN")
    ) {
        throw new HttpError("Recruiter access required", StatusCodes.FORBIDDEN);
    }

    next();
};
