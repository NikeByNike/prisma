import express from "express";
import { PrismaClient } from "@prisma/client";
import { getUser, createUser, checkUserUniqueFields } from "./db";
import { getUserSchema, createUserSchema } from "./schema";
import { validate } from "./../../utile/validate";
import { dbErrorHandler } from "./../../utile/db";

var router = express.Router();

var prisma = new PrismaClient();

router.get("/:userId", validate(getUserSchema), dbErrorHandler(getUser()));

router.post(
  "/",
  validate(createUserSchema),
  checkUserUniqueFields(),
  dbErrorHandler(createUser())
);

export default router;
