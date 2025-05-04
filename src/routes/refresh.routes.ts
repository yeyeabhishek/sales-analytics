import express from "express";
import { refreshData } from "../controllers/refresh.controller";

const router = express.Router();

router.post("/", refreshData);

export default router;
