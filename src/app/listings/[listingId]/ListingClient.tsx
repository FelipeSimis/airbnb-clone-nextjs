'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { Range } from 'react-date-range';

import { fetchWrapper } from '@services/api';

import { useLoginModal } from '@hooks/useModal';

import { eachDayOfInterval } from '@utils/eachDayOfInterval';

import Container from '@components/Container';
import { categories } from '@components/navbar/Categories';
import ListingHead from '@components/listings/ListingHead';
import HeartButton from '@components/HeartButton';
import ListingInfo from '@components/listings/ListingInfo';
import ListingReservation from '@components/listings/ListingReservation';
import Calendar from '@components/inputs/Calendar';

import {
  SafeListing,
  SafeUser,
  SafeUserWithFavorite,
  SafeReservation,
} from '../../types';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

type ListingClientProps = {
  reservations?: SafeReservation[] | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUserWithFavorite | null;
};

const ListingClient = ({
  reservations = [],
  listing,
  currentUser,
}: ListingClientProps) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [isLoading, setIsLoading] = useState(false);

  const { openModal } = useLoginModal();

  const { push } = useRouter();

  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category);
  }, [listing.category]);

  const disabledDates = useMemo(() => {
    const dates: Date[] = [];

    reservations?.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates.push(...range);
    });

    return dates;
  }, [reservations]);

  const onDateChange = (value: Range) => setDateRange(value);

  const handleCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return openModal();
    }

    setIsLoading(true);

    try {
      await fetchWrapper('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({
          listingId: listing.id,
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
      });

      setDateRange(initialDateRange);

      toast.success('Listing reserved!');

      return push('/trips');
    } catch (error) {
      return toast.error('Something went wrong!');
    } finally {
      setIsLoading(true);
    }
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    openModal,
    push,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount =
        eachDayOfInterval({
          start: dateRange.startDate,
          end: dateRange.endDate,
        }).length - 1;

      if (daysCount && totalPrice) {
        setTotalPrice(daysCount * listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price, totalPrice]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.image}
            locationValue={listing.locationValue}
            heartButton={
              <HeartButton listingId={listing.id} currentUser={currentUser} />
            }
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              category={category}
              locationValue={listing.locationValue}
              user={listing.user}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onSubmit={handleCreateReservation}
                disabled={isLoading}
                calendar={
                  <Calendar
                    value={dateRange}
                    onChange={value => onDateChange(value.selection)}
                    disabledDates={disabledDates}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
