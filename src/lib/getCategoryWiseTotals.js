import dayjs from 'dayjs';

export function getCategoryWiseTotals(transactions = [], month, year) {
  const categoryMap = {};

  transactions.forEach((tx) => {
    const txDate = dayjs(tx.date);
    if (txDate.month() === month && txDate.year() === year) {
      const cat = tx.category || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(tx.amount);
    }
  });

  return Object.entries(categoryMap).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));
}
