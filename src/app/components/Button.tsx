'use client';

import type { ButtonHTMLAttributes } from 'react';
import type { IconType } from '@react-icons/all-files';

type ButtonProps = {
  label: string;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  label,
  outline,
  small,
  icon: Icon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`disabled:opacity/70 relative w-full rounded-lg transition-colors disabled:cursor-not-allowed ${
        outline
          ? 'border-black bg-white text-black hover:bg-black hover:text-white'
          : 'border-rose-500 bg-rose-500 text-white hover:bg-rose-600'
      } ${
        small
          ? 'border-[1px] py-1 text-sm font-light'
          : 'text-md border-2 py-3 font-semibold'
      }`}
      {...rest}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}

      {label}
    </button>
  );
};

export default Button;
