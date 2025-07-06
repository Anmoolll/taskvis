import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format, parse } from "date-fns";

// Define a Transaction type for props and state
export type Transaction = {
  amount: number;
  date: string | Date;
  description: string;
  id?: string;
  category?: string;
};

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Miscellaneous"
];

interface TransactionFormProps {
  onSubmit: (data: Transaction) => void;
  initial?: Partial<Transaction>;
  loading: boolean;
}

export default function TransactionForm({ onSubmit, initial, loading }: TransactionFormProps) {
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [date, setDate] = useState(initial?.date ? format(new Date(initial.date), "yyyy-MM-dd") : "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const [error, setError] = useState("");

  // Sync form fields with initial when editing
  useEffect(() => {
    setAmount(initial?.amount?.toString() || "");
    setDate(initial?.date ? format(new Date(initial.date), "yyyy-MM-dd") : "");
    setDescription(initial?.description || "");
    setCategory(initial?.category || CATEGORIES[0]);
  }, [initial]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required");
      return;
    }
    if (isNaN(Number(amount))) {
      setError("Amount must be a number");
      return;
    }
    setError("");
    const tx: Transaction = { amount: Number(amount), date, description, category };
    if (initial?.id) tx.id = initial.id;
    onSubmit(tx);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
      />
      <select
        className="w-full border rounded px-3 py-2"
        value={category}
        onChange={e => setCategory(e.target.value)}
        disabled={loading}
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" disabled={loading}>
        {initial ? "Update" : "Add"} Transaction
      </Button>
    </form>
  );
}