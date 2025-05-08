'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { categories } from "@/constants/categories";  
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  amount: yup.number().positive().required("Amount is required"),
  description: yup.string(),  // No required validation here
  category: yup.string().required("Category is required"),
  type: yup.string().required("Type is required")  // gain or expense
});

export default function EntryForm({ onAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],  // Current date in ISO format
      type: "expense"  // Default type to expense
    }
  });

  const onSubmit = (data) => {
    const newEntry = { ...data, id: uuidv4(), date: new Date() };
    onAdd(newEntry);
    reset();
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5 p-6 border rounded-xl shadow-md bg-white"
    >
      <div>
        <input 
          placeholder="Amount" 
          type="number" 
          {...register("amount")} 
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mt-1">{errors.amount?.message}</p>
      </div>

      <div>
        <input 
          type="date" 
          {...register("date")} 
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mt-1">{errors.date?.message}</p>
      </div>

      <div>
        <input 
          placeholder="Description (Optional)" 
          {...register("description")} 
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mt-1">{errors.description?.message}</p>
      </div>

      <div>
        <select 
          {...register("category")} 
          className="w-full border p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <p className="text-red-500 text-sm mt-1">{errors.category?.message}</p>
      </div>

      <div>
        <select 
          {...register("type")} 
          className="w-full border p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="gain">Gain (Income)</option>
          <option value="expense">Expense</option>
        </select>
        <p className="text-red-500 text-sm mt-1">{errors.type?.message}</p>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md"
      >
        Add {watch("type") === 'gain' ? 'Gain' : 'Expense'}
      </button>
    </form>
  );
}
