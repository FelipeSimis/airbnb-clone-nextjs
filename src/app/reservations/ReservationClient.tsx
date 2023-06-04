'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { fetchWrapper } from '@services/api';

import ListingCard from '@components/listings/ListingCard';

import HeartButton from '@components/HeartButton';
import { SafeReservation, SafeUserWithFavorite } from '../../types';

interface ReservationClientProps {
  reservations: SafeReservation[] | null;
  currentUser?: SafeUserWithFavorite | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState('');

  const { refresh } = useRouter();

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await fetchWrapper(`/api/reservations/${id}`, {
          method: 'DELETE',
        });

        toast.success('Reservation cancelled');

        refresh();
      } catch (error) {
        toast.error('Something went wrong.');
      } finally {
        setDeletingId('');
      }
    },
    [refresh]
  );

  return (
    <div
      className="
          mt-10
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
    >
      {reservations?.map(reservation => (
        <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel guest reservation"
          heartButton={
            <HeartButton
              currentUser={currentUser}
              listingId={reservation.listingId}
            />
          }
        />
      ))}
    </div>
  );
};

export default ReservationClient;
