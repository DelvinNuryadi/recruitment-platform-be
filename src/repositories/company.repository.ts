import { prisma } from "@/lib/prisma";

export const findCompanyById = async (id: string) => {
    return await prisma.company.findUnique({ where: { id } });
};
