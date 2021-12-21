import * as Zod from "zod";

export const getUserSchema = Zod.object({
  params: Zod.object({
    userId: Zod.string().min(1),
  }),
});

export type GetUserInput = Zod.TypeOf<typeof getUserSchema>;

export const createUserSchema = Zod.object({
  body: Zod.object({
    login: Zod.string().min(6),
    password: Zod.string().min(6),
    repeatPassword: Zod.string(),
    role: Zod.enum(["USER", "ADMIN"]).optional(),
    email: Zod.string().email().optional(),
    phone: Zod.string()
      .refine((val) => val.match(/^(\+7|8)[0-9]{10}/))
      .optional(),
  }).refine((data) => data.password === data.repeatPassword, {
    message: "repeatPassword must much password",
    path: ["repeatPassword"],
  }),
});

export type CreateUserInput = Zod.TypeOf<typeof createUserSchema>;
