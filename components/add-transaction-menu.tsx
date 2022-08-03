import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { TransactionType } from '../hooks';
import { classNames } from '../utils';
import { Button } from './button';

export function AddTransactionMenu({
  onSelect,
}: {
  onSelect: (type: TransactionType) => void;
}) {
  const items: { text: string; type: TransactionType }[] = [
    { text: 'Add expense', type: 'expense' },
    { text: 'Add income', type: 'income' },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="translate-x-3 pt-1">
        <Menu.Button as={Button} variant="icon">
          <PlusIcon className="h-6 w-6 text-blue-700" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-2 py-2 ">
            {items.map((item) => {
              return (
                <Menu.Item key={item.type}>
                  {({ active }) => {
                    return (
                      <button
                        className={classNames(
                          'group flex w-full items-center rounded-md px-3 py-3',
                          active ? 'bg-gray-100' : '',
                        )}
                        onClick={() => onSelect(item.type)}
                      >
                        {item.text}
                      </button>
                    );
                  }}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
