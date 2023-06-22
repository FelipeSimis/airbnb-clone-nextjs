import prismaClient from '@libs/prismaDb';

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
      select: {
        id: true,
        listingId: true,
        listing: {
          select: {
            id: true,
            image: true,
            title: true,
            locationValue: true,
            category: true,
            price: true,
          },
        },
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

    return { favoritesListings: favorites, totalItems };
  } catch (error) {
    return null;
  }
};
