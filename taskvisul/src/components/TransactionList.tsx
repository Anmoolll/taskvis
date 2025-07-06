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
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.description}</td>
              <td>
                <button onClick={() => onEdit(tx)}>Edit</button>
                <button onClick={() => onDelete(tx._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }