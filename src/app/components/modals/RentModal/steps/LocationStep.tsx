'use client';

import Heading from '@components/Heading';

type LocationStepProps = {
  title?: string;
  countrySelect: React.ReactNode;
  map: React.ReactNode;
};

const LocationStep = ({
  title = 'Where do you want to stay?',
  countrySelect,
  map,
}: LocationStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title={title} subtitle="Pick a location" />

      {countrySelect}

      {map}
    </div>
  );
};

export default LocationStep;
