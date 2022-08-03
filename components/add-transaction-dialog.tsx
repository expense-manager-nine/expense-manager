import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import NumberFormat from 'react-number-format';
import { NewTransaction, TransactionType } from '../hooks';
import { Button } from './button';
import { FormField } from './form-field';
import { Input } from './input';
import { NumberFormatMoney } from './number-format-money';

interface Props {
  type: TransactionType;
  show: boolean;
  defaultDate: Date;
  onClose: () => void;
  onSubmit: ({ amount }: NewTransaction) => void;
}

export function AddTransactionDialog({
  type,
  show,
  defaultDate,
  onClose,
  onSubmit,
}: Props) {
  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [date, setDate] = useState(defaultDate.toISOString().substring(0, 10));
  const [months, setMonths] = useState<number>();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const dateInstance = new Date(date);
    const isDateValid =
      dateInstance instanceof Date && !isNaN(dateInstance.getTime());
    const isFormValid = amount && description && isDateValid;

    if (isFormValid) {
      onSubmit({ type, description, amount, date: dateInstance, months });
    }
  };

  const actionText = type === 'expense' ? 'Add expense' : 'Add income';

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900"
                >
                  {actionText}
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <div className="mt-6 space-y-4">
                    <FormField label="Description" labelFor="description">
                      <Input
                        required
                        id="description"
                        type="text"
                        placeholder={
                          type === 'expense'
                            ? 'Food, transportation etc.'
                            : 'Salary, one-time bonus etc.'
                        }
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Amount" labelFor="amount">
                      <NumberFormatMoney
                        required
                        id="amount"
                        customInput={Input}
                        placeholder="$0.00"
                        inputMode="decimal"
                        isAllowed={({ floatValue }) =>
                          floatValue === undefined ||
                          (floatValue > 0 && floatValue < 1000000000)
                        }
                        value={amount}
                        onValueChange={({ floatValue }) =>
                          setAmount(floatValue)
                        }
                      />
                    </FormField>

                    <FormField
                      label={isRecurring ? 'Start date' : 'Date'}
                      labelFor="date"
                    >
                      <Input
                        required
                        type="date"
                        min="2000-01-01"
                        max="2050-01-01"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </FormField>

                    <div>
                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={isRecurring}
                          onChange={(e) => setIsRecurring(e.target.checked)}
                        />
                        <span>Recurring</span>
                      </label>
                    </div>

                    {isRecurring ? (
                      <FormField label="Months" labelFor="months">
                        <NumberFormat
                          required
                          customInput={Input}
                          decimalScale={0}
                          placeholder="Number of months"
                          inputMode="numeric"
                          isAllowed={({ floatValue }) =>
                            floatValue === undefined ||
                            (floatValue > 0 && floatValue < 100)
                          }
                          value={months}
                          onValueChange={({ floatValue }) =>
                            setMonths(floatValue)
                          }
                        />
                      </FormField>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="text" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit">{actionText}</Button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
