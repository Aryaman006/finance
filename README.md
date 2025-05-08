
# 💰 Finance Dashboard

A modern finance tracker dashboard built with **Next.js**, **React**, and **Tailwind CSS**. This app allows users to manage their income and expenses, view summary cards, analyze data via charts, and track recent transactions.

## 🚀 Features

- 📊 Interactive Pie and Bar Charts (CategoryPieChart & MonthlyBarChart)
- ➕ Add new financial entries via a modal
- 🧾 View recent transactions (gain/expense)
- 🗑️ Delete transactions
- 📈 View total Gain, Expense, and Balance in stylish summary cards
- ⚡ Smooth UI with Tailwind CSS

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) — React Framework
- [React](https://reactjs.org/) — UI Library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Chart.js or Recharts](https://www.chartjs.org/) — For charts (based on your implementation)
- [MongoDB or any backend API] — Assumed for data persistence

## 📁 Folder Structure

```
src/
├── app/
│   └── page.js           # Dashboard Page
├── components/
│   ├── CategoryPieChart.jsx
│   ├── MonthlyBarChart.jsx
│   ├── EntryItem.jsx
│   └── EntryModal.jsx
├── pages/
│   └── api/
│       └── entries.js    # API routes for fetching/adding/deleting entries
```

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env.local` file and configure your backend API or MongoDB connection (if used):

```env
# Example (adjust as needed)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db
```

### 4. Run the Development Server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser.



## ✍️ Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to your branch: `git push origin feature-name`
5. Submit a pull request 🎉

