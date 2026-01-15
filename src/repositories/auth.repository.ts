import { RegisterAdminAndCompanyBodyRequest } from "@/types/auth.type";
import { prisma } from "../lib/prisma";

export const registerUserAndCompany = async (
    data: RegisterAdminAndCompanyBodyRequest
) => {
    const { fullName, companyName, email, password, phone } = data;

    return prisma.$transaction(async (tx) => {
        const company = await tx.company.create({
            data: {
                name: companyName,
                email,
                phone,
            },
            select: {
                id: true,
                name: true,
                phone: true,
            },
        });

        const user = await tx.user.create({
            data: {
                fullName,
                email,
                password,
                role: "ADMIN",
                companyId: company.id,
            },
            select: {
                id: true,
                fullName: true,
            },
        });

        return { ...company, ...user };
    });
};
