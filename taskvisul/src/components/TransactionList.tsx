import { Button } from "@/components/ui/button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";

export default function TransactionList({ transactions, onEdit, onDelete }: { transactions: any[], onEdit: (tx: any) => void, onDelete: (id: string) => void }  ) {
    if (!transactions.length) return <div>No transactions yet.</div>;
    return (
      <table className="w-full">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx: any) => (
            <tr key={tx._id}>
              <td>{tx.amount}</td>
              <td>{format(new Date(tx.date), "dd/MM/yyyy")}</td>
              <td>{tx.description}</td>
              <td className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => onEdit(tx)}
                  className="hover:bg-blue-100 text-blue-600 border-blue-200"
                >
                  <FaRegEdit />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  aria-label="Delete"
                  onClick={() => onDelete(tx._id)}
                  // className="hover:bg-red-100 text-red-600 border-red-200"
                >
                  <FaRegTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }