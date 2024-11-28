import axios from "axios";
import Transaction from "../models/Transaction.js";

const THIRD_PARTY_API =
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const initializeDatabase = async () => {
  try {
    const existingTransactions = await Transaction.countDocuments();
    if (existingTransactions > 0) {
      console.log("Database already initialized");
      return;
    }

    const response = await axios.get(THIRD_PARTY_API);
    const transactions = response.data;

    await Transaction.insertMany(
      transactions.map((transaction) => ({
        ...transaction,
        dateOfSale: new Date(transaction.dateOfSale),
      }))
    );

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};

export default initializeDatabase;
