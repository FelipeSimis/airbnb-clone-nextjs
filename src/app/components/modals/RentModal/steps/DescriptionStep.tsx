'use client';

import Heading from '@components/Heading';
import Input from '@components/inputs/Input';

import { InputStepProps } from '..';

const DescriptionStep = ({ isLoading, register, errors }: InputStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />

      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        error={errors.title}
      />

      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        error={errors.description}
      />
    </div>
  );
};

export default DescriptionStep;
