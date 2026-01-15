export type RegisterAdminAndCompanyBodyRequest = {
    companyName: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
};

export type LoginBodyRequest = {
    email: string;
    password: string;
};

export type AuthRequest = {
    id: string;
};
