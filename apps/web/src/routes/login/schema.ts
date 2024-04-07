import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export type LoginFormSchema = typeof loginFormSchema;
