import z from "zod";

export const getAllApplicantSchema = z.object({
    query: z
        .object({
            positionId: z.uuid({ error: "invalid format uuid" }).optional(),
        })
        .optional(),
});
