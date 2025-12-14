import { prisma } from "../prisma";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: { email: req.body.email }
  });
  res.status(201).json(user);
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id }
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
