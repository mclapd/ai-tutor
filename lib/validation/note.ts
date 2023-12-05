import { z } from "zod";

export const createNoteSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  src: z.string().min(1, { message: "Image is required" }),
  instructions: z.string().optional(),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
