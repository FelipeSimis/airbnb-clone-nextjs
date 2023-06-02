'use client';

import type { InputHTMLAttributes } from 'react';
import type { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { BiDollar } from '@react-icons/all-files/bi/BiDollar';

import { SignUpData } from '@schemas/signUpSchema';
import { LoginData } from '@schemas/loginSchema';
import { EditPropertyData } from '@schemas/editPropertySchema';

type FormData =
  | SignUpData
  | LoginData
  | EditPropertyData
  | {
      title: string;
      description: string;
      price: number;
    };

type InputProps<T extends FormData> = {
  id: keyof T;
  label: string;
  formatPrice?: boolean;
  error?: FieldError;
  register: UseFormRegister<T>;
  isPasswordVisible?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FormData>({
  id,
  label,
  formatPrice = false,
  error,
  register,
  isPasswordVisible = true,
  ...rest
}: InputProps<T>) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
          aria-label="Price"
        />
      )}

      <input
        id={id.toString()}
        {...register(id.toString() as Path<T>, {
          valueAsNumber: id.toString() === 'price',
        })}
        placeholder=" "
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-70 ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${
          error
            ? 'border-rose-500 focus:border-rose-500'
            : 'focus:border-black-300 border-neutral-300'
        }`}
        type={isPasswordVisible && isPasswordVisible ? 'text' : 'password'}
        {...rest}
      />

      <label
        htmlFor={id.toString()}
        className={`text-md absolute top-5 z-10 origin-[0] -translate-y-3.5 transform duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3.5 peer-focus:scale-75 ${
          formatPrice ? 'left-9' : 'left-4'
        } ${error ? 'text-rose-500' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
