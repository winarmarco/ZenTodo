import * as z from "zod";

export const todoSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().optional(),
});
