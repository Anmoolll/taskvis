// taskvisul/src/models/Transaction.ts
import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);