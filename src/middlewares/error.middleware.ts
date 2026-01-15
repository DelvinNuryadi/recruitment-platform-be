import { NextFunction, Request, Response } from "express";
import z, { ZodIssue } from "zod";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, REQUEST_STATUSES } from "@/constants";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    // handle validation error
    if (err instanceof z.ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: REQUEST_STATUSES.FAIL,
            message: ERROR_MESSAGES.VALIDATION_ERROR,
            errors: err.issues.map((issue: ZodIssue) => ({
                path: issue.path.join("."),
                message: issue.message,
                code: issue.code,
            })),
        });
    }
    return res.status(500).json({
        success: false,
        message: "Something when wrong",
        error: err.message,
    });
}
