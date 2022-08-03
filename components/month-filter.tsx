import { addMonths, format, subMonths } from 'date-fns';
import { classNames } from '../utils';

interface Props {
  currentDate: Date;
  onChange: (date: Date) => void;
}

export function MonthFilter({ currentDate, onChange }: Props) {
  const dates = [
    subMonths(currentDate, 1),
    currentDate,
    addMonths(currentDate, 1),
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {dates.map((date) => (
          <button
            key={date.toString()}
            className={classNames(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-600',
              'ring-blue-400 ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
              currentDate.getTime() === date.getTime()
                ? 'bg-white shadow'
                : 'text-gray-900 hover:bg-white/[0.5] ',
            )}
            onClick={() => onChange(date)}
          >
            {format(date, 'MMMM')}
          </button>
        ))}
      </div>
    </div>
  );
}
