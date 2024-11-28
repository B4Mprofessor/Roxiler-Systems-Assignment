import axios from "axios";

// In frontend/src/services/api.js
const BASE_URL = "http://localhost:5000/api"; // Keep backend port as 5000

export const fetchTransactions = async (month, page = 1, search = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`, {
      params: { month, page, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/statistics`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

export const fetchBarChartData = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/bar-chart`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export const fetchPieChartData = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/pie-chart`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};
