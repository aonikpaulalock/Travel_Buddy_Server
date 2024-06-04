import { z } from "zod";

const profileUpdateSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).optional(),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }).optional(),
  })
});

export const profileValidation = { profileUpdateSchema };