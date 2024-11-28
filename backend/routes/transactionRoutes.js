import express from "express";
import * as transactionController from "../controllers/transactionController.js";
import initializeDatabase from "../services/dataInitService.js";

const router = express.Router();

router.get("/initialize", async (req, res) => {
  try {
    await initializeDatabase();
    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/transactions", transactionController.getTransactions);
router.get("/statistics", transactionController.getStatistics);
router.get("/bar-chart", transactionController.getBarChartData);
router.get("/pie-chart", transactionController.getPieChartData);

export default router;
