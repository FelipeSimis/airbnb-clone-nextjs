'use client';

import { useState } from 'react';
import { BiHide } from '@react-icons/all-files/bi/BiHide';
import { BiShow } from '@react-icons/all-files/bi/BiShow';

type PasswordInputProps = {
  renderInput: (isPasswordVisible: boolean) => React.ReactNode;
};

const PasswordInput = ({ renderInput }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <div className="relative flex w-full items-center justify-between">
      {renderInput(isPasswordVisible)}

      <button
        type="button"
        onClick={togglePasswordVisibility}
        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer border-none bg-transparent"
      >
        {isPasswordVisible ? (
          <BiHide size={20} color="#f43f5e" />
        ) : (
          <BiShow size={20} color="#f43f5e" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
