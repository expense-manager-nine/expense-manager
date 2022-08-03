import { addMonths } from 'date-fns';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { NewTransaction, Transaction, TransactionType } from '../hooks';
import { AddTransactionDialog } from './add-transaction-dialog';
import { AddTransactionMenu } from './add-transaction-menu';
import { TransactionItem } from './transaction-item';

interface Props {
  transactions: Transaction[];
  defaultDate: Date;
  addTransactions: (transactions: Transaction[]) => void;
  deleteTransaction: (id: string) => void;
}

export function TransactionsSection({
  transactions,
  defaultDate,
  addTransactions,
  deleteTransaction,
}: Props) {
  const [form, setForm] = useState<TransactionType>();

  const closeForm = () => setForm(undefined);

  const addTransaction = (newTransaction: NewTransaction) => {
    const months = newTransaction.months || 1;

    const newTransactions = [];
    for (let i = 0; i < months; i++) {
      const date = addMonths(newTransaction.date, i);
      newTransactions.push({
        id: nanoid(),
        type: newTransaction.type,
        description: newTransaction.description,
        amount: newTransaction.amount,
        date,
      });
    }

    addTransactions(newTransactions);
    closeForm();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <AddTransactionMenu
          onSelect={(transactionType) => setForm(transactionType)}
        />
        {form ? (
          <AddTransactionDialog
            type={form}
            show={true}
            defaultDate={defaultDate}
            onClose={closeForm}
            onSubmit={addTransaction}
          />
        ) : null}
      </div>

      {transactions.length > 0 ? (
        <div className="mt-4 divide-y divide-gray-200">
          {transactions.map((transaction) => {
            return (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={() => deleteTransaction(transaction.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-12 px-4 text-center text-lg font-medium text-gray-400">
          No transactions found
        </div>
      )}
    </div>
  );
}
