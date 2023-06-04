import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getCurrentUser } from '@helpers/getCurrentUser';
import { getListings } from '@helpers/getListings';

import { EmptyState } from '@components/EmptyState';
import Container from '@components/Container';
import Heading from '@components/Heading';
import Paginate from '@components/Paginate';
import PropertiesClient from './PropertiesClient';

import { ITEMS_PER_PAGE } from '../../types';

export const metadata: Metadata = {
  title: 'Airbnb | My properties',
};

type PropertiesPageProps = {
  searchParams: {
    page: number;
  };
};

const PropertiesPage = async ({
  searchParams: { page },
}: PropertiesPageProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be logged in to view your properties!"
      />
    );
  }

  const listingsResults = await getListings({ userId: currentUser.id, page });

  const { listings, totalItems } = listingsResults ?? {
    listings: [],
    totalItems: 0,
  };

  if (totalItems === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you haven't listed any properties yet."
      />
    );
  }

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="Properties you have listed"
        showBackLink
      />

      {listings && <PropertiesClient properties={listings} />}

      {totalItems / ITEMS_PER_PAGE > 1 && (
        <Suspense>
          <Paginate page={Number(page)} totalItems={totalItems} />
        </Suspense>
      )}
    </Container>
  );
};

export default PropertiesPage;
