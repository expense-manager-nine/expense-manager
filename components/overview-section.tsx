import { useMemo } from 'react';
import { Transaction } from '../hooks';
import { classNames } from '../utils';
import { NumberFormatMoney } from './number-format-money';

export function OverviewSection({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const overview = useMemo(() => {
    const expensesTotal = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, current) => acc + current.amount, 0);
    const incomesTotal = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, current) => acc + current.amount, 0);

    return {
      expensesTotal,
      incomesTotal,
      balance: incomesTotal - expensesTotal,
    };
  }, [transactions]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Incomes</span>
          <NumberFormatMoney
            displayType="text"
            value={overview.incomesTotal}
            className={classNames(
              'font-bold',
              overview.incomesTotal !== 0 ? 'text-green-700' : '',
            )}
            prefix={overview.incomesTotal !== 0 ? '+$' : '$'}
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium text-gray-700">Expenses</span>
          <NumberFormatMoney
            displayType="text"
            value={overview.expensesTotal}
            className={classNames(
              'font-bold',
              overview.expensesTotal !== 0 ? 'text-red-600' : '',
            )}
            prefix={overview.expensesTotal !== 0 ? '-$' : '$'}
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-2">
          <span className="text-lg font-semibold">Balance</span>
          <NumberFormatMoney
            displayType="text"
            value={overview.balance}
            className={classNames(
              'text-lg font-bold',
              overview.balance === 0
                ? ''
                : overview.balance > 0
                ? 'text-green-700'
                : 'text-red-600',
            )}
            prefix={'$'}
          />
        </div>
      </div>
    </div>
  );
}
