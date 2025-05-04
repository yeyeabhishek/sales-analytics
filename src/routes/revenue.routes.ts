import express from "express";
import { getRevenue } from "../controllers/revenue.controller";

const router = express.Router();

router.get("/", getRevenue);

export default router; // ✅ THIS is important
