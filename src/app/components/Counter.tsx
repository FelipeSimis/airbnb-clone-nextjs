'use client';

import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';

type CounterProps = {
  title: string;
  subtitle: string;
  value?: number;
  onChange: (value: number) => void;
};

const Counter = ({ title, subtitle, value = 1, onChange }: CounterProps) => {
  const decreaseCount = () => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  };

  const increaseCount = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>

        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={decreaseCount}
          className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition-colors hover:border-rose-500"
        >
          <AiOutlineMinus className="group-hover:fill-rose-500" />
        </button>

        <span className="text-xl font-light text-neutral-600">{value}</span>

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={increaseCount}
          className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition-colors hover:border-rose-500"
        >
          <AiOutlinePlus className="group-hover:fill-rose-500" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
