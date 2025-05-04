import express from "express";
import dotenv from "dotenv";
import revenueRoutes from "./routes/revenue.routes";
import refreshRoutes from "./routes/refresh.routes";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Use routers here
app.use("/api/revenue", revenueRoutes);
app.use("/api/refresh", refreshRoutes);

export default app;
