import prismaClient from '@components/libs/prismaDb';

import { ITEMS_PER_PAGE, SafeFavorite } from '../types';

type Props = {
  userId: string;
  page?: number;
};

export type GetFavoritesListings = {
  favoritesListings: SafeFavorite[];
  totalItems: number;
};

export const getFavoritesListings = async ({
  userId,
  page = 1,
}: Props): Promise<GetFavoritesListings | null> => {
  try {
    const favorites = await prismaClient.favorite.findMany({
      where: {
        userId,
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });

    const totalItems = await prismaClient.favorite.count({
      where: {
        userId,
      },
    });

    const safeFavorites = favorites.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
      listing: {
        ...listing.listing,
        createdAt: listing.listing.createdAt.toISOString(),
        updatedAt: listing.listing.updatedAt.toISOString(),
      },
    })) satisfies SafeFavorite[];

    return { favoritesListings: safeFavorites, totalItems };
  } catch (error) {
    return null;
  }
};
