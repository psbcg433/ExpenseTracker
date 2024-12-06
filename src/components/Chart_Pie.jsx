import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const expenseList = useSelector((state) => state.expense.items);

  // Check if there is no expense data
  if (expenseList.length === 0) {
    return <div>No expenses for this month</div>;
  }

  // Calculate total expenses per category
  const categoryTotals = expenseList.reduce(
    (totals, expense) => {
      const { category, amount } = expense;
      totals[category] = (totals[category] || 0) + parseInt(amount, 10);
      return totals;
    },
    { Food: 0, Entertainment: 0, Travel: 0 } // Initialize categories
  );

  const data = {
    labels: ['Food', 'Entertainment', 'Travel'], // Categories
    datasets: [
      {
        label: 'Expense Distribution',
        data: [
          categoryTotals.Food,
          categoryTotals.Entertainment,
          categoryTotals.Travel,
        ],
        backgroundColor: ['#A000FF', '#FF9304', '#FDE006'], // Colors for categories
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Expense Distribution (Pie Chart)',
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="piechart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
