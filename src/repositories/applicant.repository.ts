import { prisma } from "@/lib/prisma";
import { createApplicantBodyRequest } from "@/types/applicant.type";
import { Prisma } from "generated/prisma/browser";

export const create = async (data: createApplicantBodyRequest) => {
    return await prisma.applicant.create({
        data: { ...data },
    });
};

export const getAllApplicants = async (
    companyId: string,
    positionId?: string
) => {
    const whereClause: Prisma.ApplicantWhereInput = {
        position: {
            companyId,
        },
    };

    if (positionId) {
        whereClause.positionId = positionId;
    }
    return await prisma.applicant.findMany({
        where: whereClause,
    });
};
