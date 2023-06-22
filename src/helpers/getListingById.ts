import prismaClient from '@libs/prismaDb';

import { SafeListing, SafeUser } from '../types';

type GetListingByIdProps = {
  listingId: string;
};

export async function getListingById({
  listingId,
}: GetListingByIdProps): Promise<
  (SafeListing & { user: Pick<SafeUser, 'name' | 'image'> }) | null
> {
  try {
    const listing = await prismaClient.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    } satisfies SafeListing & { user: Pick<SafeUser, 'name' | 'image'> };
  } catch (error) {
    return null;
  }
}
