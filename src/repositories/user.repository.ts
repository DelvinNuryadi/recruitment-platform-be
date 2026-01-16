import {
    CreateUserBodyRequest,
    CreateUserResponse,
    GetUsersInCompanyResponse,
} from "@/types/user.type";
import { prisma } from "../lib/prisma";
import { Role } from "generated/prisma/enums";

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            role: true,
            companyId: true,
            password: true,
        },
    });
};
export const findUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            company: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

export const createUser = async (
    data: CreateUserBodyRequest
): Promise<CreateUserResponse> => {
    const { email, fullName, password, role, companyId } = data;

    return await prisma.user.create({
        data: {
            email,
            fullName,
            password,
            role: role as Role,
            companyId,
        },
        select: {
            id: true,
            companyId: true,
            email: true,
            role: true,
            fullName: true,
        },
    });
};

export const getUsersInCompany = async (
    id: string
): Promise<GetUsersInCompanyResponse[]> => {
    return await prisma.user.findMany({
        where: {
            companyId: id,
        },
        select: {
            id: true,
            email: true,
            role: true,
            fullName: true,
            company: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

export const getUser = async (
    id: string
): Promise<GetUsersInCompanyResponse | null> => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            company: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
        },
    });
};
