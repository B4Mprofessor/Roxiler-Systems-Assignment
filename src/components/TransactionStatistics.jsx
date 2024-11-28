import React from "react";

const TransactionStatistics = ({ statistics }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Total Sale Amount</h3>
        <p>${statistics.totalSaleAmount || 0}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Total Sold Items</h3>
        <p>{statistics.totalSoldItems || 0}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Total Not Sold Items</h3>
        <p>{statistics.totalNotSoldItems || 0}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
