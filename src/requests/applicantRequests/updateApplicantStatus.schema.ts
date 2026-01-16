import z from "zod";

export const updateApplicantStatusSchema = z.object({
    params: z.object({
        id: z.uuid({ error: "invalid format uuid" }),
    }),
    body: z.object({
        status: z.enum([
            "APPLIED",
            "REVIEWED",
            "INTERVIEW",
            "ACCEPTED",
            "REJECTED",
        ]),
    }),
});
