'use client';

import type { IconType } from '@react-icons/all-files';

type CategoryInputProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (category: string) => void;
};

const CategoryInput = ({
  label,
  icon: Icon,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <button
      type="button"
      aria-label={`Select ${label} category`}
      onClick={() => onClick(label)}
      className={`flex w-full cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition-colors hover:border-black ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />

      <div className="font-semibold">{label}</div>
    </button>
  );
};

export default CategoryInput;
