import dayjs from 'dayjs';

export function getSummary(transactions) {
  const now = dayjs();
  const thisMonth = transactions.filter((tx) =>
    dayjs(tx.date).month() === now.month() && dayjs(tx.date).year() === now.year()
  );

  const totalThisMonth = thisMonth.reduce((sum, tx) => sum + Number(tx.amount), 0);

  return {
    totalThisMonth
  };
}
