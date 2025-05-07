import { z } from "zod";

export const TestFormSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 character." }),
  age: z.preprocess(
    (num) => Number(num),
    z.number().min(18, { message: "Must be at least 18" }),
  ),
  pin: z.preprocess(
    (num) => Number(num),
    z.number().min(6, { message: "Invalid pin!" }),
  ),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Name must be a valid email!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 character!" }),
});

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Password must be at least 6 character!" }),
    email: z.string().email({ message: "Name must be a valid email!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 character!" }),
    confirm_password: z.string(),
  })
  .refine(
    (data) => {
      console.log("PASSWORDS", data.confirm_password, data.password);
      if (data.password.length && data.confirm_password.length) {
        return data.password === data.confirm_password;
      }
      return false;
    },
    {
      message: "Passwords do not match!",
      path: ["confirm_password"],
    },
  );
