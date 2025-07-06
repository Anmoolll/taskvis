// taskvisul/src/pages/api/transactions.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  }

  if (req.method === "POST") {
    const { amount, date, description } = req.body;
    if (!amount || !date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = await Transaction.create({ amount, date, description });
    return res.status(201).json(transaction);
  }

  if (req.method === "PUT") {
    const { id, amount, date, description } = req.body;
    if (!id || !amount || !date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description },
      { new: true }
    );
    return res.status(200).json(transaction);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
    await Transaction.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}