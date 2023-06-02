'use client';

import dynamic from 'next/dynamic';

import { type RentFormData } from '@schemas/rentSchema';

import Heading from '@components/Heading';
import { Skeleton } from '@components/Skeleton';

const ImageUpload = dynamic(() => import('@components/ImageUpload'), {
  ssr: false,
  loading: () => <Skeleton height="h-[40vh]" />,
});

type ImagesStepProps = {
  watchImageSrc: string;
  setCustomValue: (id: keyof RentFormData, value: string | number) => void;
};

const ImagesStep = ({ watchImageSrc, setCustomValue }: ImagesStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />

      <ImageUpload
        value={watchImageSrc}
        onChange={imageSrc => setCustomValue('imageSrc', imageSrc)}
      />
    </div>
  );
};

export default ImagesStep;
