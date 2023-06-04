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
      include: {
        favorites: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      emailVerified: user.emailVerified?.toISOString() || undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    } satisfies SafeUserWithFavorite;
  } catch (error) {
    return null;
  }
}
