import z from "zod";

export const updatePositionSchema = z.object({
    params: z.object({
        id: z.uuid({ error: "invalid format uuid" }),
    }),
    body: z.object({
        title: z.string().min(1, "Title is required"),
        location: z.string().min(1, "Location is required"),
        type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"], "Invalid type"),
        description: z.string().min(1, "Description is required"),
        salary: z.string().min(1, "Salary is required"),
    }),
});
