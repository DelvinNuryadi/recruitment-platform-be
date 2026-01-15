import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        companyName: z
            .string({ message: "Company name is required." })
            .trim()
            .min(2, { message: "Company name is too short." }),

        email: z
            .string({ message: "Email is required." })
            .trim()
            .toLowerCase()
            .email({ message: "Invalid email address." }),

        password: z
            .string({ message: "Password is required." })
            .min(6, { message: "Password must be at least 6 characters." })
            .max(128, { message: "Password is too long." }),

        fullName: z
            .string({ message: "Full name is required." })
            .trim()
            .min(2, { message: "Full name is too short." }),

        phone: z
            .string({ message: "Phone number is required." })
            .trim()
            .regex(/^[0-9]{9,15}$/, {
                message: "Phone number must contain only digits (9–15 chars).",
            }),
    }),
});
