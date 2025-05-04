import { Request, Response } from "express";
import { pool } from "../config/db";

export const getRevenue = async (req: Request, res: Response): Promise<void> => {
    const start = req.query.start as string;
    const end = req.query.end as string;
  
    if (!start || !end) {
      res.status(400).json({ error: "Start and end dates are required" });
      return;
    }
  
    try {
      const result = await pool.query(
        `SELECT 
           SUM(oi.quantity * oi.unit_price * (1 - oi.discount)) AS total_revenue
         FROM order_items oi
         JOIN orders o ON oi.order_id = o.id
         WHERE o.date_of_sale BETWEEN $1 AND $2`,
        [start, end]
      );
  
      const revenue = result.rows[0].total_revenue || 0;
      res.json({ totalRevenue: parseFloat(revenue) });
    } catch (error) {
      console.error("Revenue fetch error:", error);
      res.status(500).json({ error: "Failed to calculate revenue" });
    }
  };
  
