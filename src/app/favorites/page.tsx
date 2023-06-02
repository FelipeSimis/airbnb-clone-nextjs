import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getCurrentUserWithFavorites } from '@helpers/getCurrentUserWithFavorites';
import { getFavoritesListings } from '@helpers/getFavoritesListings';

import { EmptyState } from '@components/EmptyState';
import Container from '@components/Container';
import Heading from '@components/Heading';
import ListingCard from '@components/listings/ListingCard';
import HeartButton from '@components/HeartButton';
import Paginate from '@components/Paginate';

import { ITEMS_PER_PAGE, SafeFavorite } from '../types';

export const metadata: Metadata = {
  title: 'Airbnb | My favorites',
};

type FavoritesPageProps = {
  searchParams: {
    page: number;
  };
};

const FavoritesPage = async ({
  searchParams: { page },
}: FavoritesPageProps) => {
  const currentUser = await getCurrentUserWithFavorites();

  if (!currentUser) {
    return (
      <EmptyState
        title="You must be logged in to view your favorites!"
        subtitle="Please login"
      />
    );
  }

  const favorites = await getFavoritesListings({
    userId: currentUser.id,
    page,
  });

  const { favoritesListings, totalItems } = favorites ?? {
    favoritesListings: [],
    totalItems: 0,
  };

  if (totalItems === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you haven't favorited any properties yet."
      />
    );
  }

  return (
    <Container>
      <Heading title="Favorites" subtitle="Listings you have favorited" />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favoritesListings.map(listing => {
          return (
            <ListingCard<SafeFavorite>
              key={listing.id}
              data={listing}
              heartButton={
                <HeartButton
                  currentUser={currentUser}
                  listingId={listing.listingId}
                />
              }
            />
          );
        })}
      </div>

      {totalItems / ITEMS_PER_PAGE > 1 && (
        <Suspense>
          <Paginate page={Number(page)} totalItems={totalItems} />
        </Suspense>
      )}
    </Container>
  );
};

export default FavoritesPage;
