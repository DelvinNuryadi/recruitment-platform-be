import { prisma } from "@/lib/prisma";
import {
    createPositionBodyRequest,
    getAllPositionResponse,
    getDetailPositionResponse,
} from "@/types/position.type";

export const create = async (data: createPositionBodyRequest) => {
    const { title, location, type, description, salary, companyId, createdBy } =
        data;
    return await prisma.position.create({
        data: {
            title,
            location,
            type,
            description,
            salary,
            companyId,
            createdBy,
        },
        select: {
            id: true,
            location: true,
            type: true,
            description: true,
            salary: true,
            isActive: true,
            companyId: true,
            creator: {
                select: {
                    fullName: true,
                },
            },
        },
    });
};

export const getAllPositions = async (
    id: string
): Promise<getAllPositionResponse[]> => {
    return await prisma.position.findMany({
        where: { companyId: id },
        select: {
            id: true,
            title: true,
            description: true,
            type: true,
            salary: true,
            isActive: true,
        },
    });
};

export const getPosition = async (
    positionId: string,
    companyId: string
): Promise<getDetailPositionResponse | null> => {
    return await prisma.position.findUnique({
        where: { id: positionId, companyId: companyId },
        select: {
            id: true,
            title: true,
            description: true,
            type: true,
            salary: true,
            isActive: true,
            company: {
                select: {
                    id: true,
                    name: true,
                },
            },
            creator: {
                select: {
                    id: true,
                    fullName: true,
                },
            },
        },
    });
};

export const update = async (
    positionId: string,
    companyId: string,
    data: createPositionBodyRequest
) => {
    return await prisma.position.update({
        where: { id: positionId, companyId },
        data,
    });
};
