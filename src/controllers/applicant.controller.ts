import { createApplicantBodyRequest } from "@/types/applicant.type";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as applicantService from "../services/applicant.service";
import { AuthRequest } from "@/types/auth.type";

export const createApplicant = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = res.locals.parsed.body as createApplicantBodyRequest;
        const result = await applicantService.createApplicant(data);
        return res
            .status(StatusCodes.CREATED)
            .json({ message: "applicant created successfully", data: result });
    } catch (error) {
        next(error);
    }
};

export const getAllApplicants = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { positionId } = res.locals.parsed.query;
        const { id: userId } = req.user as AuthRequest;
        console.log("isi position id:", res.locals.parsed);
        const result = await applicantService.getAllApplicants(
            userId,
            positionId
        );
        return res.status(StatusCodes.OK).json({
            message: "retrived applicants successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
