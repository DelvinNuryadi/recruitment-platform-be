import z from "zod";

export const getApplicantDetailSchema = z.object({
    params: z.object({
        id: z.uuid({ error: "invalid format uuid" }),
    }),
});
