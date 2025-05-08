import dayjs from 'dayjs';
import mongoose from 'mongoose';

const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log(NEXT_PUBLIC_MONGODB_URI);


if (!NEXT_PUBLIC_MONGODB_URI) {
  throw new Error("Please define the NEXT_PUBLIC_MONGODB_URI environment variable");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(NEXT_PUBLIC_MONGODB_URI, {
      dbName: 'finance_app',
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ Connected to MongoDB");
      return mongoose;
    }).catch(err => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
export function getMonthlyTotals(transactions, year) {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: dayjs().month(i).format('MMM'),
    total: 0,
  }));

  transactions.forEach((tx) => {
    const txDate = dayjs(tx.date);
    if (txDate.year() === year) {
      months[txDate.month()].total += Number(tx.amount);
    }
  });

  return months;
}
