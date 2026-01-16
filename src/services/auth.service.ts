import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../repositories/auth.repository";
import * as userRepository from "../repositories/user.repository";
import {
    AuthRequest,
    LoginBodyRequest,
    RegisterAdminAndCompanyBodyRequest,
} from "@/types/auth.type";
import { HttpError } from "@/lib/http-error";
import { StatusCodes } from "http-status-codes";

export const registerUserAndCompany = async (
    data: RegisterAdminAndCompanyBodyRequest
) => {
    const user = await userRepository.findUserByEmail(data.email);

    if (user) {
        throw new HttpError("Email already registered", StatusCodes.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const result = await authRepository.registerUserAndCompany({
        ...data,
        password: hashedPassword,
    });

    return result;
};

export const login = async (data: LoginBodyRequest) => {
    const { email, password } = data;
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new HttpError(
            "Invalid email or password",
            StatusCodes.UNAUTHORIZED
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new HttpError(
            "Invalid email or password",
            StatusCodes.UNAUTHORIZED
        );
    }

    const accessToken = jwt.sign(
        { id: user.id, email: data.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: "1d",
        }
    );
    const { password: _password, ...safeUser } = user;
    return { token: accessToken, user: safeUser };
};

export const getMe = async (data: AuthRequest) => {
    const { id } = data;
    const user = await userRepository.findUserById(id);
    if (!user) {
        throw new HttpError("user not found", StatusCodes.NOT_FOUND);
    }
    return user;
};
