import { createApplicantBodyRequest } from "@/types/applicant.type";
import * as applicantRepository from "../repositories/applicant.repository";
import * as userRepository from "../repositories/user.repository";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";

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
    return result;
};
