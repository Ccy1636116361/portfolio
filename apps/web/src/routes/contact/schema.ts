import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(2, "Must be longer than 2 characters")
    .max(100, "Must be shorter than 100 characters"),
  message: z
    .string()
    .min(1, "Must be longer than 1 character")
    .max(250, "Must be shorter than 250 character"),
});

export type LoginFormSchema = typeof contactFormSchema;
