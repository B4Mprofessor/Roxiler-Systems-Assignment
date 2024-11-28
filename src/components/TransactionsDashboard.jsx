import React, { useState, useEffect } from "react";
import TransactionsTable from "./TransactionsTable.jsx";
import TransactionStatistics from "./TransactionStatistics.jsx";
import PriceRangeBarChart from "./PriceRangeBarChart.jsx";
import CategoryPieChart from "./CategoryPieChart.jsx";

const TransactionsDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchAllData = async () => {
    try {
      const urls = [
        `/api/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchText}`,
        `/api/statistics?month=${selectedMonth}`,
        `/api/bar-chart?month=${selectedMonth}`,
        `/api/pie-chart?month=${selectedMonth}`,
      ];

      const responses = await Promise.all(
        urls.map((url) =>
          fetch(url).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
        )
      );

      const [
        transactionsResponse,
        statisticsResponse,
        barChartResponse,
        pieChartResponse,
      ] = responses;

      setTransactions(transactionsResponse.transactions);
      setTotalPages(transactionsResponse.totalPages);
      setStatistics(statisticsResponse);
      setBarChartData(barChartResponse);
      setPieChartData(pieChartResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [selectedMonth, currentPage, searchText]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search transactions"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="ml-2 p-2 border rounded"
        />
      </div>

      <TransactionsTable
        transactions={transactions}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <TransactionStatistics statistics={statistics} />

      <div className="flex">
        <PriceRangeBarChart data={barChartData} />
        <CategoryPieChart data={pieChartData} />
      </div>
    </div>
  );
};

export default TransactionsDashboard;
