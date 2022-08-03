import React from 'react';
import { classNames } from '../utils';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'text' | 'icon';
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button({ variant = 'primary', className, ...props }, ref) {
    const variants = {
      primary:
        'px-4 py-2 bg-blue-100 text-blue-900 hover:bg-blue-200 disabled:hover:bg-blue-100',
      text: 'text-gray-700 hover:text-gray-900',
      icon: 'hover:bg-gray-100 rounded-full p-2',
    };

    return (
      <button
        ref={ref}
        className={classNames(
          'rounded-lg border border-transparent text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50',
          variants[variant],
        )}
        {...props}
      />
    );
  },
);
