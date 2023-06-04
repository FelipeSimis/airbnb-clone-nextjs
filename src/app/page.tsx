import { getCurrentUserWithFavorites } from '@helpers/getCurrentUserWithFavorites';
import { type ListingParams, getListings } from '@helpers/getListings';

import Container from '@components/Container';
import { EmptyState } from '@components/EmptyState';
import ListingCard from '@components/listings/ListingCard';
import HeartButton from '@components/HeartButton';
import Paginate from '@components/Paginate';

import { ITEMS_PER_PAGE, SafeListing } from '../types';

type HomeProps = {
  searchParams: ListingParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUserWithFavorites();
  const listingsResult = await getListings(searchParams);

  const { listings, totalItems } = listingsResult ?? {
    listings: [],
    totalItems: 0,
  };

  return totalItems === 0 ? (
    <EmptyState showResetButton />
  ) : (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map(listing => (
          <ListingCard<SafeListing>
            key={listing.id}
            data={listing}
            heartButton={
              <HeartButton listingId={listing.id} currentUser={currentUser} />
            }
          />
        ))}
      </div>

      {totalItems / ITEMS_PER_PAGE > 1 && (
        <Paginate page={Number(searchParams.page)} totalItems={totalItems} />
      )}
    </Container>
  );
};

export default Home;
