import z from "zod";

export const deleteApplicantSchema = z.object({
    params: z.object({
        id: z.uuid({ error: "invalid format uuid" }),
    }),
});
