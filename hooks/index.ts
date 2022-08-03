import { useCallback, useEffect, useState } from 'react';

export type TransactionType = 'expense' | 'income';

export interface NewTransaction {
  type: TransactionType;
  description: string;
  amount: number;
  date: Date;
  months?: number;
}

export interface Transaction extends Omit<NewTransaction, 'months'> {
  id: string;
}

export function useTransactionsStorage() {
  const storageKey = 'transactions';
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const _setTransactions = useCallback((newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem(storageKey, JSON.stringify(newTransactions));
  }, []);

  useEffect(() => {
    let _transactions: Transaction[] = [];

    try {
      const item = localStorage.getItem(storageKey);
      _transactions = item ? JSON.parse(item) : _transactions;
    } catch (error) {
      _transactions = [];
    }

    for (const transaction of _transactions) {
      if (!(transaction.date instanceof Date)) {
        transaction.date = new Date(transaction.date);
      }

      if (typeof transaction.amount !== 'number') {
        transaction.amount = parseFloat(transaction.amount) || 0;
      }
    }

    _setTransactions(_transactions);
    setLoading(false);
  }, [_setTransactions]);

  const addTransactions = (newTransactions: Transaction[]) => {
    try {
      const compareDateFn = (a: Transaction, b: Transaction) => {
        return a.date > b.date ? -1 : 1;
      };

      _setTransactions(
        [...transactions, ...newTransactions].sort(compareDateFn),
      );
    } catch (error) {}
  };

  const deleteTransaction = (id: string) => {
    _setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  };

  return { transactions, addTransactions, deleteTransaction, loading };
}
