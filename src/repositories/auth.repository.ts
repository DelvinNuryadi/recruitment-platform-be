import { RegisterAdminAndCompanyBodyRequest } from "@/types/auth.type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};

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
        });

        const user = await tx.user.create({
            data: {
                fullName,
                email,
                password,
                role: "ADMIN",
                companyId: company.id,
            },
        });

        return { company, user };
    });
};
