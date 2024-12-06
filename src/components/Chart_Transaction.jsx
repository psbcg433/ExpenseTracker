import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const HorizontalBarChart = () => {
  // Getting the expense data from the Redux store
  const expenseList = useSelector((state) => state.expense.items);

  // Count categories from the expense data
  const countCategories = () => {
    return expenseList.reduce((acc, record) => {
      acc[record.category] = (acc[record.category] || 0) + 1;
      return acc;
    }, {});
  };

  const categoryCounts = countCategories();

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: "#8784D2",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
    },
    indexAxis: "y", 
    scales: {
      x: {
        beginAtZero: true, 
      },
    },
  };

  return (
    <div className="barchartholder">
      <h2>Top Expenses</h2>
      {expenseList.length > 0 ? (
        <Bar className="barchart" data={chartData} options={options} />
      ) : (
        <p>No expenses for this month</p>
      )}
    </div>
  );
};

export default HorizontalBarChart;
