import { prisma } from "../prisma";
import { Request, Response } from "express";

export const createCampaign = async (req: Request, res: Response) => {
  const campaign = await prisma.campaign.create({
    data: req.body,
    include: { steps: true, recipients: true }
  });
  res.status(201).json(campaign);
};

export const getCampaigns = async (req: Request, res: Response) => {
  const campaigns = await prisma.campaign.findMany({
    where: { userId: req.params.userId },
    include: { steps: true, recipients: true }
  });
  res.json(campaigns);
};
