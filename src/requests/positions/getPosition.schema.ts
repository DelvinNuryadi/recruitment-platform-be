import z from "zod";

export const getPositionSchema = z.object({
    params: z.object({
        id: z.uuid({ error: "invalid format uuid" }),
    }),
});
