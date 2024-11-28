import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import initializeDatabase from "./services/dataInitService.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", transactionRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});
