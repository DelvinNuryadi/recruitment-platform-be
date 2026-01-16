import z from "zod";

export const updateApplicantNotesSchema = z.object({
    params: z.object({
        id: z.uuid({ error: "invalid format uuid" }),
    }),
    body: z.object({
        notes: z.string().optional(),
    }),
});
