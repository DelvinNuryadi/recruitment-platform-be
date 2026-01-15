import z from "zod";

export const registerUserSchema = z.object({
    body: z.object({
        email: z.email("Invalid email format"),
        password: z.string().min(6, "Password is required"),
        fullName: z.string({ error: "fullname is required" }),
        role: z.enum(["ADMIN", "RECRUITER"], "Role must be ADMIN or RECRUITER"),
    }),
});
