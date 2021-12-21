import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import createError, { HttpError } from "http-errors";
import routes from "./routes";

dotenv.config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  res
    .status(err.statusCode || 500)
    .json({ error: err.message, ...(err.isues ? { isues: err.isues } : {}) });
});

var port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log("Listening on port " + port);
});
