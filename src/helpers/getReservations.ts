import prismaClient from '@libs/prismaDb';

import { ITEMS_PER_PAGE, type SafeReservation } from '../types';

type Params = {
  listingId?: string;
  userId?: string;
  authorId?: string;
  page?: number;
};

type GetReservations = {
  reservations: SafeReservation[];
  totalItems: number;
};

export const getReservations = async ({
  listingId,
  userId,
  authorId,
  page = 1,
}: Params): Promise<GetReservations | null> => {
  try {
    const query = {
      ...(listingId && { listingId }),
      ...(userId && { userId }),
      ...(authorId && { listing: { userId: authorId } }),
    } satisfies Omit<Params, 'authorId'>;

    const reservations = await prismaClient.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        startDate: 'asc',
      },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });

    const totalItems = await prismaClient.reservation.count({
      where: query,
    });

    const safeReservations = reservations.map(reservation => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      },
    }));

    return {
      reservations: safeReservations,
      totalItems,
    };
  } catch (error) {
    return null;
  }
};
