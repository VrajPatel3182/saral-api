import { Request, Response } from "express";

export const getOverview = async (req: Request, res: Response) => {
  try {

    // 🔹 TEMP logic (replace later with real queries)
    const stats = {
      searchesRun: 128,
      candidatesAnalyzed: 1482,
      outreachInitiated: 64
    };

    const recentActivity = [
      {
        message:
          "AI analyzed 320 frontend profiles for “Design System Lead”",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        message:
          "AI ranked candidates for “Senior Backend Engineer”",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
      },
      {
        message:
          "AI generated outreach copy for React hiring campaign",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ];

    return res.json({
      stats,
      recentActivity
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch dashboard overview" });
  }
};
