import { createPositionBodyRequest } from "@/types/position.type";
import * as userRepository from "../repositories/user.repository";
import * as positionRepository from "../repositories/position.repository";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";

export const createPosition = async (
    userId: string,
    data: createPositionBodyRequest
) => {
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

    const result = await positionRepository.create({
        ...data,
        companyId: user.company.id,
        createdBy: user.id,
    });
    if (!result) {
        throw new HttpError(
            "failed to create position",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

    return result;
};

export const getAllPositions = async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }
    const result = await positionRepository.getAllPositions(user.company.id);
    return result;
};

export const getPosition = async (userId: string, positionId: string) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }
    const result = await positionRepository.getPosition(
        positionId,
        user.company.id
    );
    if (!result) {
        throw new HttpError("Position not found", StatusCodes.NOT_FOUND);
    }
    return result;
};
