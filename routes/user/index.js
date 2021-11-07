var express = require("express");
var { PrismaClient } = require("@prisma/client");
var router = express.Router();

var prisma = new PrismaClient();

router.get("/:userId", async (req, res, next) => {
  try {
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
        cart: {
          select: {
            count: true,
            product: true,
          },
        },
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
