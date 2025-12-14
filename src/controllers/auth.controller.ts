import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { prisma } from "../prisma";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email }
    });

    await prisma.creditAccount.create({
      data: {
        userId: user.id,
        balance: 20
      }
    });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
};
