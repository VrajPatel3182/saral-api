import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/user.routes";
import candidateRoutes from "./routes/candidate.routes";
import searchRoutes from "./routes/search.routes";
import creditRoutes from "./routes/credit.routes";
import shortlistRoutes from "./routes/shortlist.routes";
import campaignRoutes from "./routes/campaign.routes";
import analyticsRoutes from "./routes/analytics.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/credits", creditRoutes);
app.use("/api/shortlist", shortlistRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;
