import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getCurrentUserWithFavorites } from '@helpers/getCurrentUserWithFavorites';
import { getReservations } from '@helpers/getReservations';

import { EmptyState } from '@components/EmptyState';
import Container from '@components/Container';
import Heading from '@components/Heading';
import Paginate from '@components/Paginate';
import ReservationClient from './ReservationClient';

import { ITEMS_PER_PAGE } from '../types';

export const metadata: Metadata = {
  title: 'Airbnb | Reservations',
};

type ReservationsPageProps = {
  searchParams: {
    page: number;
  };
};

const ReservationsPage = async ({
  searchParams: { page },
}: ReservationsPageProps) => {
  const currentUser = await getCurrentUserWithFavorites();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservationsResults = await getReservations({
    authorId: currentUser.id,
    page,
  });

  const { reservations, totalItems } = reservationsResults ?? {
    reservations: [],
    totalItems: 0,
  };

  if (totalItems === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
        showBackLink
      />

      <ReservationClient
        currentUser={currentUser}
        reservations={reservations}
      />

      {totalItems / ITEMS_PER_PAGE > 1 && (
        <Suspense>
          <Paginate page={Number(page)} totalItems={totalItems} />
        </Suspense>
      )}
    </Container>
  );
};

export default ReservationsPage;
