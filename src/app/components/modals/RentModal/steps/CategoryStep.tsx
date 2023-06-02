'use client';

import { type RentFormData } from '@schemas/rentSchema';

import Heading from '@components/Heading';
import CategoryInput from '@components/inputs/CategoryInput';
import { categories } from '@components/navbar/Categories';

type CategoryStepProps = {
  watchCategory: string;
  setCustomValue: (id: keyof RentFormData, value: string | number) => void;
};

export const CategoryStep = ({
  watchCategory,
  setCustomValue,
}: CategoryStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these describes your place?"
        subtitle="Pick a category"
      />

      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto pr-1 scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-w-1 md:grid-cols-2">
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              label={item.label}
              selected={watchCategory === item.label}
              icon={item.icon}
              onClick={category => setCustomValue('category', category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
