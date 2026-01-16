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

export const getApplicantDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: applicantId } = res.locals.parsed.params;
        const { id: userId } = req.user as AuthRequest;
        const result = await applicantService.getApplicantsDetail(
            userId,
            applicantId
        );
        return res.status(StatusCodes.OK).json({
            message: "retrived applicant successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateApplicantUpdateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: applicantId } = res.locals.parsed.params;
        const { id: userId } = req.user as AuthRequest;
        const { status } = res.locals.parsed.body;
        const result = await applicantService.updateApplicantStatus(
            userId,
            applicantId,
            status
        );
        return res.status(StatusCodes.OK).json({
            message: "update status successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateApplicantUpdateNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.user as AuthRequest;
        const { id: applicantId } = res.locals.parsed.params;
        const { notes } = res.locals.parsed.body;
        const result = await applicantService.updateApplicantNotes(
            userId,
            applicantId,
            notes
        );
        return res.status(StatusCodes.OK).json({
            message: "update notes successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteApplicant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: applicantId } = res.locals.parsed.params;
        const { id: userId } = req.user as AuthRequest;
        const result = await applicantService.deleteApplicant(
            userId,
            applicantId
        );
        return res.status(StatusCodes.OK).json({
            message: "delete applicant successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
