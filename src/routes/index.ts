import { Express } from "express";
import indexRouter from "./root";
import usersRouter from "./user";
import cartRouter from "./cart";

export default function (app: Express) {
  app.use("/", indexRouter);
  app.use("/user", usersRouter);
  app.use("/cart", cartRouter);
}
