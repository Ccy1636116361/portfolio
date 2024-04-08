import { z } from "zod";

export const linksFormSchema = z.object({
  url: z.string().url(),
  shortcut: z.string().min(2).max(20),
});

export type LinksFormSchema = typeof linksFormSchema;

export const deleteLinksFormSchema = z.object({
  id: z.string(),
});

export type DeleteLinksFormSchema = typeof deleteLinksFormSchema;

export const editLinksFormSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  shortcut: z.string().min(2).max(20),
});

export type EditLinksFormSchema = typeof editLinksFormSchema;
