import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const PriceRangeBarChart = ({ data }) => {
  return (
    <div className="w-1/2 p-4">
      <h3 className="text-xl mb-4">Price Range Distribution</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default PriceRangeBarChart;
