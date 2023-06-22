import prismaClient from '@libs/prismaDb';

import { getSession } from '@helpers/getCurrentUser';

import { SafeUserWithFavorite } from '../types';

export async function getCurrentUserWithFavorites(): Promise<SafeUserWithFavorite | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        favorites: {
          select: {
            listingId: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}
