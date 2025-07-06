"use client";
import { useEffect, useState } from "react";
import TransactionList from "@/components/TransactionList";
import TransactionForm, { Transaction } from "@/components/TransactionForm";
import MonthlyBarChart from "@/components/MonthlyBarCharts";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [error, setError] = useState("");

  // Fetch transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/transaction");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || "Error fetching transactions");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddOrUpdate(tx: Transaction) {
    setLoading(true);
    setError("");
    try {
      const method = editing ? "PUT" : "POST";
      const body = editing ? { ...tx, id: editing.id } : tx;
      const res = await fetch("/api/transaction", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to save transaction");
      setEditing(null);
      fetchTransactions();
    } catch (err: any) {
      setError(err.message || "Error saving transaction");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/transaction", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete transaction");
      fetchTransactions();
    } catch (err: any) {
      setError(err.message || "Error deleting transaction");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(tx: Transaction) {
    setEditing({ ...tx, id: (tx as any)._id });
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Transaction Dashboard</h1>
      {error && <div className="text-red-500">{error}</div>}
      <MonthlyBarChart transactions={transactions.map(tx => ({ ...tx, date: typeof tx.date === "string" ? tx.date : tx.date.toISOString() }))} />
      <TransactionForm
        onSubmit={handleAddOrUpdate}
        initial={editing || undefined}
        loading={loading}
      />
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
