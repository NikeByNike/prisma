import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { GetCartInput } from "./schema";

const prisma = new PrismaClient();

export function getCart() {
  return async (
    req: Request<GetCartInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
      select: {
        cart: {
          select: {
            count: true,
            product: {
              select: {
                id: true,
                price: true,
                currency: true,
                name: true,
                description: true,
              }
            }
          }
        }
      },
    });
    res.json(user?.cart);
  };
}
