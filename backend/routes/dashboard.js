import express from "express";
import {
  getOverview,
  getEarningsChart,
  getSubscriberGrowthHandler,
  getTransactionsHandler,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/overview", getOverview);
router.get("/earnings", getEarningsChart);
router.get("/growth", getSubscriberGrowthHandler);
router.get("/transactions", getTransactionsHandler);

export default router;
