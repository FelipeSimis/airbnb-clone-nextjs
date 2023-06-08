import type { Metadata } from 'next';

import { getCurrentUserWithFavorites } from '@helpers/getCurrentUserWithFavorites';
import { getListings } from '@helpers/getListings';
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

export async function generateStaticParams() {
  const listingsResult = await getListings({
    page: 1,
  });

  const { listings } = listingsResult ?? {
    listings: [],
  };

  return listings.map(listing => ({
    listingId: listing.id,
  }));
}

const ListingPage = async ({ params: { listingId } }: ListingPageProps) => {
  const listing = await getListingById({ listingId });

  if (!listing) {
    return <EmptyState />;
  }

  const currentUserData = getCurrentUserWithFavorites();
  const reservationsData = getReservations({ listingId });

  const [currentUser, reservations] = await Promise.all([
    currentUserData,
    reservationsData,
  ]);

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations?.reservations}
    />
  );
};

export default ListingPage;
