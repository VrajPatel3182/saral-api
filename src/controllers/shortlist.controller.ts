import { prisma } from "../prisma";
import { Request, Response } from "express";

export const addShortlist = async (req: Request, res: Response) => {
  const record = await prisma.shortlisted.create({ data: req.body });
  res.status(201).json(record);
};

export const getShortlisted = async (req: Request, res: Response) => {
  const list = await prisma.shortlisted.findMany({
    where: { userId: req.params.userId }
  });
  res.json(list);
};
