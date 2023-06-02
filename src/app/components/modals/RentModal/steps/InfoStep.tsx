'use client';

import { type RentFormData } from '@schemas/rentSchema';

import Counter from '@components/Counter';
import Heading from '@components/Heading';

type InfoStepProps = {
  watchGuestCount: number;
  watchRoomCount: number;
  watchBathroomCount: number;
  setCustomValue:
    | ((id: keyof RentFormData, value: string | number) => void)
    | ((
        id: 'guestCount' | 'roomCount' | 'bathroomCount',
        value: number
      ) => void);
};

const InfoStep = ({
  watchGuestCount,
  watchRoomCount,
  watchBathroomCount,
  setCustomValue,
}: InfoStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      />

      <Counter
        title="Number of guests"
        subtitle="How many guests?"
        value={watchGuestCount}
        onChange={guestCount => setCustomValue('guestCount', guestCount)}
      />

      <Counter
        title="Number of rooms"
        subtitle="How many rooms?"
        value={watchRoomCount}
        onChange={roomCount => setCustomValue('roomCount', roomCount)}
      />

      <Counter
        title="Number of bathrooms"
        subtitle="How many bathrooms?"
        value={watchBathroomCount}
        onChange={bathroomCount =>
          setCustomValue('bathroomCount', bathroomCount)
        }
      />
    </div>
  );
};

export default InfoStep;
