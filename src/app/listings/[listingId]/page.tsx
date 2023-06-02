import type { Metadata } from 'next';

import { getCurrentUserWithFavorites } from '@helpers/getCurrentUserWithFavorites';
import { getListingById } from '@helpers/getListingById';
import { getReservations } from '@helpers/getReservations';

import { EmptyState } from '@components/EmptyState';
import ListingClient from './ListingClient';

type ListingPageProps = {
  params: {
    listingId: string;
  };
};

export async function generateMetadata({
  params: { listingId },
}: ListingPageProps): Promise<Metadata> {
  const listing = await getListingById({ listingId });

  return {
    title: `Airbnb ${listing?.title && `| ${listing.title}`}`,
  };
}

const ListingPage = async ({ params: { listingId } }: ListingPageProps) => {
  const currentUser = await getCurrentUserWithFavorites();
  const listing = await getListingById({ listingId });
  const reservations = await getReservations({ listingId });

  return !listing ? (
    <EmptyState />
  ) : (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations?.reservations}
    />
  );
};

export default ListingPage;
