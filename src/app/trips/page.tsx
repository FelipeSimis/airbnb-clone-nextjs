import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getCurrentUserWithFavorites } from '@helpers/getCurrentUserWithFavorites';
import { getReservations } from '@helpers/getReservations';

import { EmptyState } from '@components/EmptyState';
import Container from '@components/Container';
import Paginate from '@components/Paginate';
import Heading from '@components/Heading';
import TripsClient from './TripsClient';

import { ITEMS_PER_PAGE } from '../../types';

export const metadata: Metadata = {
  title: 'Airbnb | My trips',
};

type TripsPageProps = {
  searchParams: {
    page: number;
  };
};

const TripsPage = async ({ searchParams: { page } }: TripsPageProps) => {
  const currentUser = await getCurrentUserWithFavorites();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservationsResults = await getReservations({
    userId: currentUser.id,
    page,
  });

  const { reservations, totalItems } = reservationsResults ?? {
    reservations: [],
    totalItems: 0,
  };

  if (totalItems === 0) {
    return (
      <EmptyState
        title="No trips founded"
        subtitle="Looks like you haven't reserved a trip yet!"
      />
    );
  }

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you been and where you're going"
        showBackLink
      />

      <TripsClient reservations={reservations} currentUser={currentUser} />

      {totalItems / ITEMS_PER_PAGE > 1 && (
        <Suspense>
          <Paginate page={Number(page)} totalItems={totalItems} />
        </Suspense>
      )}
    </Container>
  );
};

export default TripsPage;
