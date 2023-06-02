import prismaClient from '@components/libs/prismaDb';

import { ITEMS_PER_PAGE, type SafeListing } from '../types';

export type ListingParams = {
  userId?: string;
  category?: string;
  location?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
};

type GetListings = {
  listings: SafeListing[];
  totalItems: number;
};

export async function getListings({
  userId,
  category,
  location,
  guestCount,
  roomCount,
  bathroomCount,
  startDate,
  endDate,
  page = 1,
}: ListingParams): Promise<GetListings | null> {
  try {
    const query = {
      ...(userId && { userId }),
      ...(category && { category }),
      ...(location && { locationValue: location }),
      ...(guestCount && { guestCount: { gte: +guestCount } }),
      ...(roomCount && { roomCount: { gte: +roomCount } }),
      ...(bathroomCount && { bathroomCount: { gte: +bathroomCount } }),
      ...(startDate &&
        endDate && {
          reservations: {
            none: {
              OR: [
                {
                  startDate: { lte: startDate },
                  endDate: { gte: startDate },
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate },
                },
              ],
            },
          },
        }),
    };

    const listings = await prismaClient.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });

    const totalItems = await prismaClient.listing.count({
      where: query,
    });

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    })) satisfies SafeListing[];

    return { listings: safeListings, totalItems };
  } catch (error) {
    return null;
  }
}
