import React from "react";

const TransactionsTable = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      {/* Transactions Table */}
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="p-2">{transaction.id}</td>
              <td className="p-2">{transaction.title}</td>
              <td className="p-2">{transaction.description}</td>
              <td className="p-2">${transaction.price}</td>
              <td className="p-2">{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mb-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange((prev) => prev - 1)}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange((prev) => prev + 1)}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
