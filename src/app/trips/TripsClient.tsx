'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { fetchWrapper } from '@services/api';

import ListingCard from '@components/listings/ListingCard';
import HeartButton from '@components/HeartButton';

import { SafeReservation, SafeUserWithFavorite } from '../types';

type TripsClientProps = {
  reservations: SafeReservation[] | null;
  currentUser?: SafeUserWithFavorite | null;
};

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const [deletingId, setDeletingId] = useState('');

  const { refresh } = useRouter();

  const handleCancelReservation = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);

        await fetchWrapper(`/api/reservations/${id}`, {
          method: 'DELETE',
        });

        toast.success('Reservation canceled!');

        return refresh();
      } catch (error) {
        return toast.error('Something went wrong!');
      } finally {
        setDeletingId('');
      }
    },
    [refresh]
  );

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {reservations?.map(reservation => (
        <ListingCard
          key={reservation.id}
          reservation={reservation}
          data={reservation.listing}
          actionId={reservation.id}
          onAction={handleCancelReservation}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel reservation"
          heartButton={
            <HeartButton
              currentUser={currentUser}
              listingId={reservation.listing.id}
            />
          }
        />
      ))}
    </div>
  );
};

export default TripsClient;
