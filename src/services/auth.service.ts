import bcrypt from "bcrypt";
import * as authRepository from "../repositories/auth.repository";
import { RegisterAdminAndCompanyBodyRequest } from "@/types/auth.type";

export const registerUserAndCompany = async (
    data: RegisterAdminAndCompanyBodyRequest
) => {
    const user = await authRepository.findUserByEmail(data.email);

    if (user) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const result = await authRepository.registerUserAndCompany({
        ...data,
        password: hashedPassword,
    });

    return result;
};
