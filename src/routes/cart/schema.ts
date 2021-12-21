import * as Zod from "zod";

export const getCartSchema = Zod.object({
  params: Zod.object({
    userId: Zod.string().min(1),
  }),
});

export type GetCartInput = Zod.TypeOf<typeof getCartSchema>;
