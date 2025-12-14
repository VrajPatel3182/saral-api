import { prisma } from "../prisma";
import { Request, Response } from "express";

export const createCandidate = async (req: Request, res: Response) => {
  const candidate = await prisma.candidate.create({ data: req.body });
  res.status(201).json(candidate);
};

export const getCandidates = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const [data, total] = await Promise.all([
    prisma.candidate.findMany({
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.candidate.count()
  ]);

  res.json({ data, total, page, limit });
};

export const getCandidate = async (req: Request, res: Response) => {
  const candidate = await prisma.candidate.findUnique({
    where: { id: req.params.id }
  });
  res.json(candidate);
};

export const updateCandidate = async (req: Request, res: Response) => {
  const candidate = await prisma.candidate.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(candidate);
};

export const deleteCandidate = async (req: Request, res: Response) => {
  await prisma.candidate.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
