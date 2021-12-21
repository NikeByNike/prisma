import express from "express";
import { PrismaClient } from "@prisma/client";
import { getCart } from "./db";
import { getCartSchema } from "./schema";
import { validate } from "./../../utile/validate";
import { dbErrorHandler } from "./../../utile/db";

var router = express.Router();

var prisma = new PrismaClient();

router.get("/:userId", validate(getCartSchema), dbErrorHandler(getCart()));

export default router;
