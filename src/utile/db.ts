import createError, { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";

export const dbErrorHandler =
  <T>(
    fn: (req: Request<T>, res: Response, next: NextFunction) => Promise<any>
  ) =>
  async (req: Request<T>, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof createError.HttpError) {
        next(error);
      } else if (error instanceof Error) {
        next(createError(500, error.message.replace(/.*\n/g, "").trim()));
      } else {
        next(createError(500, "Some prisma error"));
      }
    }
  };
