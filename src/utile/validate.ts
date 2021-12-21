import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, IssueData } from "zod";

function isueMaper(isue: IssueData) {
  return {
    field: isue.path ? isue.path[isue.path?.length - 1] : "",
    message: isue.message,
  };
}

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(
          createError(400, "Validation error", {
            isues: JSON.parse(error.message).map(isueMaper),
          })
        );
      } else {
        next(createError(400, "Some request error"));
      }
    }
  };
