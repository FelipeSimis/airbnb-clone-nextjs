'use client';

import Heading from '@components/Heading';
import Input from '@components/inputs/Input';

import { InputStepProps } from '..';

const PriceStep = ({ isLoading, register, errors }: InputStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />

      <Input
        id="price"
        label="Price"
        type="number"
        formatPrice
        disabled={isLoading}
        register={register}
        error={errors.price}
      />
    </div>
  );
};

export default PriceStep;
