import { isSameMonth } from 'date-fns';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { MonthFilter } from '../components/month-filter';
import { OverviewSection } from '../components/overview-section';
import { TransactionsSection } from '../components/transactions-section';
import { useTransactionsStorage } from '../hooks';

const Home: NextPage = () => {
  const [filterDate, setFilterDate] = useState(new Date());
  const { transactions, addTransactions, deleteTransaction, loading } =
    useTransactionsStorage();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      isSameMonth(filterDate, transaction.date),
    );
  }, [filterDate, transactions]);

  return (
    <div>
      <Head>
        <title>Expense manager</title>
        <meta name="description" content="Expense manager app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto my-6 max-w-lg px-4">
        <div className="mt-8">
          <MonthFilter currentDate={filterDate} onChange={setFilterDate} />
        </div>

        {loading ? (
          <div className="py-12 text-center">Loading...</div>
        ) : (
          <div>
            <div className="mt-12">
              <OverviewSection transactions={filteredTransactions} />
            </div>

            <div className="mt-12 ">
              <TransactionsSection
                transactions={filteredTransactions}
                defaultDate={filterDate}
                addTransactions={addTransactions}
                deleteTransaction={deleteTransaction}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
