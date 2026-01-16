import { createApplicantBodyRequest } from "@/types/applicant.type";
import * as applicantRepository from "../repositories/applicant.repository";
import * as userRepository from "../repositories/user.repository";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";
import { ApplicantStatus } from "generated/prisma/enums";

export const createApplicant = async (data: createApplicantBodyRequest) => {
    const result = await applicantRepository.create(data);

    return result;
};

export const getAllApplicants = async (userId: string, positionId: string) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }
    if (!user.company) {
        throw new HttpError(
            "user has no company assigned",
            StatusCodes.CONFLICT
        );
    }
    const companyId = user.company.id;
    const result = await applicantRepository.getAllApplicants(
        companyId,
        positionId
    );
    if (result.length === 0) {
        throw new HttpError("applicant not found", StatusCodes.NOT_FOUND);
    }
    return result;
};

export const getApplicantsDetail = async (applicantId: string) => {
    const result = await applicantRepository.getApplicantDetail(applicantId);
    if (!result) {
        throw new HttpError("applicant not found", StatusCodes.NOT_FOUND);
    }
    return result;
};

export const updateApplicantStatus = async (
    applicantId: string,
    status: ApplicantStatus
) => {
    const result = await applicantRepository.updateApplicantStatus(
        applicantId,
        status
    );

    return result;
};
export const updateApplicantNotes = async (
    applicantId: string,
    notes: string
) => {
    const result = await applicantRepository.updateApplicantNotes(
        applicantId,
        notes
    );

    return result;
};

export const deleteApplicant = async (applicantId: string) => {
    const result = await applicantRepository.deleteApplicant(applicantId);
    return result;
};
