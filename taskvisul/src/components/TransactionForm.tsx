import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

// Define a Transaction type for props and state
export type Transaction = {
  amount: number;
  date: string | Date;
  description: string;
  id?: string;
};

interface TransactionFormProps {
  onSubmit: (data: Transaction) => void;
  initial?: Partial<Transaction>;
  loading: boolean;
}

export default function TransactionForm({ onSubmit, initial, loading }: TransactionFormProps) {
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [date, setDate] = useState(initial?.date ? format(new Date(initial.date), "yyyy-MM-dd") : "");
  const [description, setDescription] = useState(initial?.description || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !date || !description) {
      setError("All fields are required");
      return;
    }
    if (isNaN(Number(amount))) {
      setError("Amount must be a number");
      return;
    }
    setError("");
    onSubmit({ amount: Number(amount), date, description });
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
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" disabled={loading}>
        {initial ? "Update" : "Add"} Transaction
      </Button>
    </form>
  );
}