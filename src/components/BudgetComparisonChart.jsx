'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function BudgetComparisonChart({ budgets = [], expenses = [] }) {
  // Group expenses by category
  const actualSpentByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const categories = [...new Set(budgets.map(b => b.category))];

  const budgetData = categories.map(cat => {
    const budget = budgets.find(b => b.category === cat);
    return budget ? parseFloat(budget.amount) : 0;
  });

  const spentData = categories.map(cat => actualSpentByCategory[cat] || 0);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Budget',
        data: budgetData,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Spent',
        data: spentData,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-bold mb-4">Budget vs Actual</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
