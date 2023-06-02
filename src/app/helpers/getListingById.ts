import prismaClient from '@components/libs/prismaDb';

import { SafeListing, SafeUser } from '../types';

type GetListingByIdProps = {
  listingId: string;
};

export async function getListingById({
  listingId,
}: GetListingByIdProps): Promise<(SafeListing & { user: SafeUser }) | null> {
  try {
    const listing = await prismaClient.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.createdAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString(),
      },
    } satisfies SafeListing & { user: SafeUser };
  } catch (error) {
    return null;
  }
}
