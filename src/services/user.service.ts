import { CreateUserBodyRequest } from "@/types/user.type";
import * as userRepository from "../repositories/user.repository";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export const createUser = async (data: CreateUserBodyRequest) => {
    const user = await userRepository.findUserById(data.userId);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const result = await userRepository.createUser({
        ...data,
        password: hashedPassword,
        companyId: user.company?.id,
    });

    return result;
};

export const getUserInCompany = async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }
    const result = await userRepository.getUsersInCompany(user.company.id);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }

    return result;
};

export const getUser = async (id: string) => {
    const result = await userRepository.getUser(id);
    if (!result) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }

    return result;
};

export const deleteUser = async (id: string) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }

    const result = await userRepository.deleteUser(id);
    if (!result) {
        throw new HttpError("user not found", StatusCodes.CONFLICT);
    }
    return result;
};
