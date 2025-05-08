export default function EntryItem({ entry, onDelete }) {
    return (
      <div
        className={`flex justify-between items-center p-4 border rounded-lg shadow-md ${
          entry.type === "expense" ? "bg-red-100" : "bg-green-100"
        }`}
      >
        <div>
          <span
            className={`text-xl font-semibold ${
              entry.type === "expense" ? "text-red-500" : "text-green-500"
            }`}
          >
            {entry.type === "expense" ? "Expense" : "Gain"} - ₹{entry.amount}
          </span>
          <p>{entry.description}</p>
          <small>{new Date(entry.date).toLocaleDateString()}</small>
        </div>
        <button
          onClick={() => onDelete(entry._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    );
  }
  