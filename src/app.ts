import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import candidateRoutes from "./routes/candidate.routes";
import searchRoutes from "./routes/search.routes";
import creditRoutes from "./routes/credit.routes";
import shortlistRoutes from "./routes/shortlist.routes";
import campaignRoutes from "./routes/campaign.routes";
import analyticsRoutes from "./routes/analytics.routes";

import { errorHandler } from "./middleware/error.middleware";
import { apiRateLimiter, strictRateLimiter } from "./middleware/rateLimit.middleware";
import { authenticate } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate, apiRateLimiter, userRoutes);
app.use("/api/candidates", authenticate, apiRateLimiter, candidateRoutes);
app.use("/api/search", authenticate, strictRateLimiter, searchRoutes);
app.use("/api/credits", authenticate, strictRateLimiter, creditRoutes);
app.use("/api/shortlist", authenticate, apiRateLimiter, shortlistRoutes);
app.use("/api/campaigns", authenticate, apiRateLimiter, campaignRoutes);
app.use("/api/analytics", authenticate, strictRateLimiter, analyticsRoutes);

app.use(errorHandler);

export default app;
