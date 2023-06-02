'use client';

import dynamic from 'next/dynamic';
import type { IconType } from '@react-icons/all-files';

import { useCountries } from '@hooks/useCountries';

import Avatar from '@components/Avatar';
import ListingCategory from '@components/listings/ListingCategory';
import { Skeleton } from '@components/Skeleton';

import { SafeUser } from '../../types';

const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
  loading: () => <Skeleton />,
});

type ListingInfoProps = {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
};

const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <p>Hosted by {user.name}</p>

          <Avatar src={user.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guests</span>

          <span>{roomCount} rooms</span>

          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          label={category.label}
          description={category.description}
          icon={category.icon}
        />
      )}

      <hr />

      <p className="text-lg font-light text-neutral-500">{description}</p>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
