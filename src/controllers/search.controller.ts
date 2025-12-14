import { prisma } from "../prisma";
import { Request, Response } from "express";

export const searchCandidates = async (req: Request, res: Response) => {
  const { userId, query } = req.body;

  const credit = await prisma.creditAccount.findFirst({ where: { userId } });
  if (!credit || credit.balance < 1) {
    return res.status(400).json({ message: "Insufficient credits" });
  }

  const results = await prisma.candidate.findMany({
    where: {
      name: { contains: query, mode: "insensitive" }
    }
  });

  await prisma.$transaction([
    prisma.creditAccount.update({
      where: { id: credit.id },
      data: { balance: { decrement: 1 } }
    }),
    prisma.searchHistory.create({
      data: {
        userId,
        queryText: query,
        results: results.length,
        credits: 1
      }
    })
  ]);

  res.json(results);
};
