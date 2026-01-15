import { NextFunction, Request, Response } from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, REQUEST_STATUSES } from "@/constants";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof z.ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: REQUEST_STATUSES.FAIL,
            message: ERROR_MESSAGES.VALIDATION_ERROR,
            errors: err.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
                code: issue.code,
            })),
        });
    }

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: REQUEST_STATUSES.FAIL,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message,
    });
}
