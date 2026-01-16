import { z } from "zod";

export const createApplicantSchema = z.object({
    body: z.object({
        positionId: z.string().uuid("Invalid positionId"),
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email format"),
        phone: z.string().min(8, "Phone number is too short"),
        education: z.string().min(1, "Education is required"),
        experience: z
            .number()
            .int()
            .nonnegative("Experience must be 0 or more"),
        resumeUrl: z.string().url("Invalid resume URL"),
    }),
});
