import { PrismaClient } from "@prisma/client";
import createError, { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";
import { GetUserInput, CreateUserInput } from "./schema";

const prisma = new PrismaClient();

export function getUser() {
  return async (
    req: Request<GetUserInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
      select: {
        id: true,
        login: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    res.json(user);
  };
}

export function checkUserUniqueFields() {
  return async (
    err: HttpError,
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const isues = [];

    const ununiqueLogin = await prisma.user.findUnique({
      where: {
        login: req.body.login,
      },
    });
    if (ununiqueLogin) {
      isues.push({ field: "login", message: "Ununique login" });
    }

    const ununiquePhone =
      req.body.phone &&
      (await prisma.user.findUnique({
        where: {
          phone: req.body.phone,
        },
      }));
    if (ununiquePhone) {
      isues.push({ field: "phone", message: "Ununique phone" });
    }

    const ununiqueEmail =
      req.body.email &&
      (await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      }));
    if (ununiqueEmail) {
      isues.push({ field: "email", message: "Ununique email" });
    }

    if (isues.length) {
      err = createError(400, "Validation error", {
        isues: isues.concat(err.isues),
      });
      console.log(err);
    }

    next(err);
  };
}

export function createUser() {
  return async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await prisma.user.create({
      data: {
        login: req.body.login,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
      },
      select: {
        id: true,
        login: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    res.json(user);
  };
}
