import { Role } from "generated/prisma/enums";

export type CreateUserBodyRequest = {
    userId: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
    companyId: string;
};

export type CreateUserResponse = {
    id: string;
    companyId: string;
    email: string;
    fullName: string;
    role: Role;
};

export type GetUsersInCompanyResponse = {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    company: {
        id: string;
        name: string;
    };
};
