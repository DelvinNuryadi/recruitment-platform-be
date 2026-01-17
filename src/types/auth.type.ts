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

export type CompanyRegisterResponse = {
    id: string;
    name: string;
    phone: string;
};

export type AdminRegisterResponse = {
    id: string;
    fullName: string;
};

export type RegisterAdminCompanyRegisterResponse = {
    company: CompanyRegisterResponse;
    admin: AdminRegisterResponse;
};
