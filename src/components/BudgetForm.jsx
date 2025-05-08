'use client';

import { useState, useEffect } from 'react';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function BudgetForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'month' || name === 'year' ? parseInt(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      category: '',
      amount: '',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          name="month"
          value={formData.month}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
        <input
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-4 py-2 rounded-lg"
      >
        {initialData ? 'Update Budget' : 'Add Budget'}
      </button>
    </form>
  );
}
