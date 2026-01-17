import { ApplicantStatus } from "generated/prisma/enums";

export type createApplicantBodyRequest = {
    positionId: string;
    fullName: string;
    email: string;
    phone: string;
    education: string;
    experience: number;
    resumeUrl: string;
};

export type getAllApplicantResponse = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    status: ApplicantStatus;
    createdAt: Date;
};

export type getApplicantDetailResponse = {
    id: string;
    positionId: string;
    fullName: string;
    email: string;
    phone: string;
    education: string;
    experience: number;
    resumeUrl: string;
    status: ApplicantStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
};
