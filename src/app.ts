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
import dashboardRoutes from "./routes/dashboard.routes";

import { errorHandler } from "./middleware/error.middleware";
import { apiRateLimiter, strictRateLimiter } from "./middleware/rateLimit.middleware";
import { authenticate } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", apiRateLimiter, authenticate, dashboardRoutes);
app.use("/api/users", apiRateLimiter, authenticate, userRoutes);
app.use("/api/candidates", apiRateLimiter, authenticate, candidateRoutes);
app.use("/api/search", strictRateLimiter, authenticate, searchRoutes);
app.use("/api/credits", strictRateLimiter, authenticate, creditRoutes);
app.use("/api/shortlist", apiRateLimiter, authenticate, shortlistRoutes);
app.use("/api/campaigns", apiRateLimiter, authenticate, campaignRoutes);
app.use("/api/analytics", strictRateLimiter, authenticate, analyticsRoutes);

app.use(errorHandler);

export default app;
