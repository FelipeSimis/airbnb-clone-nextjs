'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

import { formatDate } from '@utils/formatDate';

import { useCountries } from '@hooks/useCountries';

import Button from '@components/Button';

import { SafeFavorite, SafeListing, SafeReservation } from '../../../types';

type ListingCardProps<T extends SafeListing | SafeFavorite> = {
  heartButton?: React.ReactNode;
  editButton?: React.ReactNode;
  data: T;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
};

const ListingCard = <T extends SafeListing | SafeFavorite>({
  heartButton,
  editButton,
  data,
  reservation,
  disabled,
  actionId = '',
  actionLabel,
  onAction,
}: ListingCardProps<T>) => {
  const { push } = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(
    'listing' in data ? data.listing.locationValue : data.locationValue
  );

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (e.currentTarget.disabled) {
      return;
    }

    onAction?.(actionId);
  };

  const getPrice = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return 'listing' in data ? data.listing.price : data.price;
  }, [data, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [reservation]);

  return (
    <div
      role="button"
      aria-hidden
      tabIndex={0}
      aria-label={`Go to ${
        'listing' in data ? data.listing.title : data.title
      }`}
      onClick={() =>
        push(`/listings/${'listing' in data ? data.listing.id : data.id}`)
      }
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col items-baseline gap-2">
        <div className="relative w-full overflow-hidden rounded-xl sm:aspect-square">
          <CldImage
            src={'listing' in data ? data.listing.image : data.image}
            alt={'listing' in data ? data.listing.title : data.title}
            width={600}
            height={600}
            sizes="(max-width: 600px) 100vw, 300px"
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            format="webp"
          />

          <div className="absolute right-3 top-3">
            {heartButton || editButton}
          </div>
        </div>

        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate ||
            ('listing' in data ? data.listing.category : data.category)}
        </div>

        <div className="flex items-center gap-1">
          <p className="font-semibold">$ {getPrice}</p>

          {!reservation && <span className="font-light"> night</span>}
        </div>

        {reservation?.user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Reserved by {reservation.user.name}
            </span>

            <Image
              src={reservation.user.image || '/images/user-placeholder.jpg'}
              alt="User picture"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        )}

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
