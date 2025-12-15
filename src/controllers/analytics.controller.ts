import { Request, Response } from "express";
import { prisma } from "../prisma";

// Create analytics event
export const createEvent = async (req: Request, res: Response) => {
  const event = await prisma.analyticsEvent.create({
    data: {
      campaignId: req.body.campaignId,
      recipientId: req.body.recipientId,
      eventType: req.body.eventType,
      metadata: req.body.metadata
    }
  });

  res.status(201).json(event);
};

// Campaign analytics dashboard
export const getCampaignAnalytics = async (
  req: Request,
  res: Response
) => {
  const { campaignId } = req.params;

  const events = await prisma.analyticsEvent.findMany({
    where: { campaignId }
  });

  const summary = {
    delivered: events.filter((e: any) => e.eventType === "DELIVERED").length,
    opened: events.filter((e: any) => e.eventType === "OPENED").length,
    clicked: events.filter((e: any) => e.eventType === "CLICKED").length,
    replied: events.filter((e: any) => e.eventType === "REPLIED").length
  };

  res.json(summary);
};
