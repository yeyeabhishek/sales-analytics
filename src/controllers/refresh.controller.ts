import { Request, Response } from "express";
import { loadCSV } from "../services/csvLoader";

export const refreshData = async (_req: Request, res: Response) => {
  try {
    await loadCSV();
    res.json({ message: "✅ Data refreshed successfully" });
  } catch (err) {
    console.error("Error refreshing data:", err);
    res.status(500).json({ error: "Failed to refresh data" });
  }
};
