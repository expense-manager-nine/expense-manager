import { format } from 'date-fns';
import { Transaction } from '../hooks';
import { Button } from './button';
import { NumberFormatMoney } from './number-format-money';

export function TransactionItem({
  transaction,
  onDelete,
}: {
  transaction: Transaction;
  onDelete: () => void;
}) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="font-semibold">
          {format(transaction.date, 'dd MMM yyyy')}
        </div>
        <div className="font-bold">
          <NumberFormatMoney
            value={transaction.amount}
            className={
              transaction.type === 'expense' ? 'text-red-600' : 'text-green-700'
            }
            displayType="text"
            prefix={transaction.type === 'expense' ? '-$' : '+$'}
          />
        </div>
      </div>

      <div className="mt-1 flex items-start justify-between">
        <div className="font-medium text-gray-500">
          {transaction.description}
        </div>
        <Button variant="text" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
