import type { NextPage } from 'next';
import Head from 'next/head';
import { OverviewSection } from '../components/overview-section';
import { TransactionsSection } from '../components/transactions-section';
import { useTransactionsStorage } from '../hooks';

const Home: NextPage = () => {
  const { transactions, addTransactions, deleteTransaction, loading } =
    useTransactionsStorage();

  return (
    <div>
      <Head>
        <title>Expense manager</title>
        <meta name="description" content="Expense manager app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto my-6 max-w-lg px-4">
        {loading ? (
          <div className="py-12 text-center">Loading...</div>
        ) : (
          <div>
            <div className="mt-12">
              <OverviewSection transactions={transactions} />
            </div>

            <div className="mt-12 ">
              <TransactionsSection
                transactions={transactions}
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
