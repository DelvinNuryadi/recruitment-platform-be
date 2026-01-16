import { prisma } from "@/lib/prisma";
import {
    createApplicantBodyRequest,
    getAllApplicantResponse,
    getApplicantDetailResponse,
} from "@/types/applicant.type";
import { ApplicantStatus, Prisma } from "generated/prisma/browser";

export const create = async (data: createApplicantBodyRequest) => {
    return await prisma.applicant.create({
        data: { ...data },
    });
};

export const getAllApplicants = async (
    companyId: string,
    positionId?: string
): Promise<getAllApplicantResponse[]> => {
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
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            status: true,
        },
    });
};

export const getApplicantDetail = async (
    companyId: string,
    applicantId: string
): Promise<getApplicantDetailResponse | null> => {
    return await prisma.applicant.findUnique({
        where: {
            id: applicantId,
            position: {
                companyId,
            },
        },
    });
};

export const updateApplicantStatus = async (
    companyId: string,
    applicantId: string,
    status: ApplicantStatus
) => {
    return await prisma.applicant.update({
        where: {
            id: applicantId,
            position: {
                companyId,
            },
        },
        data: { status },
        select: {
            id: true,
            fullName: true,
            status: true,
        },
    });
};
export const updateApplicantNotes = async (
    companyId: string,
    applicantId: string,
    notes: string
) => {
    return await prisma.applicant.update({
        where: { id: applicantId, position: { companyId } },
        data: { notes },
        select: {
            id: true,
            fullName: true,
            notes: true,
        },
    });
};

export const deleteApplicant = async (
    companyId: string,
    applicantId: string
) => {
    return await prisma.applicant.delete({
        where: { id: applicantId, position: { companyId } },
    });
};
