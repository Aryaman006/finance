'use client';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function BudgetList({ budgets, onEdit, onDelete }) {
  if (!budgets.length) {
    return <p className="text-center text-gray-500 mt-6">No budgets yet.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      {budgets.map((b) => (
        <div
          key={b._id}
          className="bg-gray-100 p-4 md:p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between"
        >
          <div>
            <p className="font-semibold text-lg">{b.category}</p>
            <p className="text-sm text-gray-600">
              ₹{b.amount} — {months[b.month]} {b.year}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex gap-3">
            <button
              onClick={() => onEdit(b)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(b._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
