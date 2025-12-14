import { Request, Response } from "express";
import { prisma } from "../prisma";

// Get credit balance
export const getCreditBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const account = await prisma.creditAccount.findFirst({
    where: { userId }
  });

  if (!account) {
    return res.status(404).json({ message: "Credit account not found" });
  }

  res.json({ balance: account.balance });
};

// Add credits
export const addCredits = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  const account = await prisma.creditAccount.upsert({
    where: { userId },
    update: {
      balance: { increment: amount }
    },
    create: {
      userId,
      balance: amount
    }
  });

  res.json(account);
};

// Deduct credits
export const deductCredits = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  const account = await prisma.creditAccount.findFirst({
    where: { userId }
  });

  if (!account || account.balance < amount) {
    return res.status(400).json({ message: "Insufficient credits" });
  }

  const updated = await prisma.creditAccount.update({
    where: { id: account.id },
    data: {
      balance: { decrement: amount }
    }
  });

  res.json(updated);
};
