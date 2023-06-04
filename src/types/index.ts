import type { Favorite, User, Listing, Reservation } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'emailVerified' | 'createdAt' | 'updatedAt'
> & {
  emailVerified: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export type SafeUserWithFavorite = SafeUser & {
  favorites: Favorite[];
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
};

export type SafeFavorite = Omit<Favorite, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
} & { listing: SafeListing };

export const ITEMS_PER_PAGE = 10;
