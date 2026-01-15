import { NextFunction, Request, Response } from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, REQUEST_STATUSES } from "@/constants";
import { Prisma } from "generated/prisma/client";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
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

    // Prisma known errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: REQUEST_STATUSES.FAIL,
                message: "resource not found",
            });
        }

        if (err.code === "P2002") {
            return res.status(StatusCodes.CONFLICT).json({
                status: REQUEST_STATUSES.FAIL,
                message: "duplicate data",
            });
        }
    }

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: REQUEST_STATUSES.FAIL,
            message: err.message,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: REQUEST_STATUSES.ERROR,
        message: "internal server error",
    });
}
