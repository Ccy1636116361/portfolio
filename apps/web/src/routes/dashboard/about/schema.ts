import { z } from "zod";

export const aboutFormSchema = z.object({
  text: z.string(),
  id: z.string(),
});

export type LoginFormSchema = typeof aboutFormSchema;
