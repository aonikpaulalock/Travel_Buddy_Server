import { z } from "zod";

const UserCreateSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
    profile: z.object({
      bio: z.string({
        required_error: "Bio is required",
        invalid_type_error: "Bio must be a string",
      }),
      age: z.number({
        required_error: "age is required",
        invalid_type_error: "age must be a number",
      })
    }),
  })
});

export const userValidation = { UserCreateSchema };