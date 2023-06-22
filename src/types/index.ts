import type { Favorite, User, Listing, Reservation } from '@prisma/client';

export type SafeUser = Pick<User, 'id' | 'name' | 'email' | 'image'>;

export type SafeUserWithFavorite = SafeUser & {
  favorites: Pick<Favorite, 'listingId'>[];
};

export type SafeListing = Omit<Listing, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'updatedAt' | 'startDate' | 'endDate'
> & {
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  user:
    | User
    | {
        image: string | null;
        name: string | null;
      };
};

export type SafeFavorite = {
  id: string;
  listingId: string;
} & {
  listing: {
    id: string;
    image: string;
    title: string;
    locationValue: string;
    category: string;
    price: number;
  };
};

export const ITEMS_PER_PAGE = 10;
