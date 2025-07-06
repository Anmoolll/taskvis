import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function groupByMonth(transactions: { date: string; amount: number }[]): { month: string; total: number }[] {
  const result: { [month: string]: number } = {};
  transactions.forEach(tx => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
    result[month] = (result[month] || 0) + tx.amount;
  });
  return Object.entries(result).map(([month, total]) => ({ month, total }));
}

export default function MonthlyBarChart({ transactions }: { transactions: { date: string; amount: number }[] }) {
  const data = groupByMonth(transactions);
  if (!data.length) return <div>No data for chart.</div>;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}