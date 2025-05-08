import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    // description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["gain", "expense"], required: true },  // Gain or Expense
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Entry || mongoose.model("Entry", entrySchema);
