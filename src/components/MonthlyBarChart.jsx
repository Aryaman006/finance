'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { getMonthlyTotals } from '@/lib/mongodb';

export default function MonthlyBarChart({ transactions }) {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  useEffect(() => {
    const monthlyData = getMonthlyTotals(transactions, selectedYear);
    setData(monthlyData);
  }, [transactions, selectedYear]);

  if (!transactions || transactions.length === 0)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        No transaction data available.
      </div>
    );

  const years = Array.from(
    new Set(transactions.map((tx) => dayjs(tx.date).year()))
  ).sort((a, b) => b - a); // descending

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Monthly Expenses</h2>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {years.length > 0 ? (
            years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))
          ) : (
            <option disabled>No years found</option>
          )}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" tickFormatter={(m) => dayjs().month(m).format('MMM')} />
          <YAxis tickFormatter={(val) => `$${val.toLocaleString()}`} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
