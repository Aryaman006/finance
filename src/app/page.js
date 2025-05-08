'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import CategoryPieChart from '@/components/CategoryPieChart';
import EntryItem from '@/components/EntryItem';
import EntryModal from '@/components/EntryModal';
import MonthlyBarChart from '@/components/MonthlyBarChart';

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [gain, setGain] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchEntries = async () => {
      try {
        const res = await fetch('/api/entries');
        const data = await res.json();
        setEntries(data);
        updateTotals(data);
      } catch (err) {
        console.error('Failed to fetch entries:', err);
      }
    };

    fetchEntries();
  }, []);

  const handleAdd = async (newEntry) => {
    try {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      const savedEntry = await res.json();
      const updatedEntries = [savedEntry, ...entries];
      setEntries(updatedEntries);
      updateTotals(updatedEntries);
    } catch (err) {
      console.error('Failed to add entry:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/entries/${id}`, { method: 'DELETE' });
      const updatedEntries = entries.filter((entry) => entry._id !== id);
      setEntries(updatedEntries);
      updateTotals(updatedEntries);
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const updateTotals = (entriesList) => {
    let totalGain = 0;
    let totalExpense = 0;

    entriesList.forEach((entry) => {
      if (entry.type === 'gain') totalGain += entry.amount;
      else if (entry.type === 'expense') totalExpense += entry.amount;
    });

    setGain(totalGain);
    setExpense(totalExpense);
    setTotal(totalGain - totalExpense);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <EntryModal onAdd={handleAdd} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
  {/* Gain Card */}
  <div className="bg-gradient-to-br from-green-200 to-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group border border-green-200 hover:border-green-400">
    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-green-700 transition">Gain</h2>
    <p className="text-3xl font-bold text-green-600 mt-2">${gain}</p>
  </div>

  {/* Expense Card */}
  <div className="bg-gradient-to-br from-red-200 to-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group border border-red-100 hover:border-red-400">
    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-red-700 transition">Expense</h2>
    <p className="text-3xl font-bold text-red-600 mt-2">${expense}</p>
  </div>

  {/* Balance Card */}
  <div className="bg-gradient-to-br from-indigo-200 to-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group border border-indigo-100 hover:border-indigo-400">
    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-700 transition">Total Balance</h2>
    <p className="text-3xl font-bold text-indigo-600 mt-2">${total}</p>
  </div>
</div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <CategoryPieChart transactions={entries} />
        <MonthlyBarChart transactions={entries} />
      </div>

      {/* Recent Entries */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No entries found.</p>
          ) : (
            entries.map((entry) => (
              <EntryItem key={entry._id} entry={entry} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
