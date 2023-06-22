import { getServerSession } from 'next-auth';

import prismaClient from '@libs/prismaDb';
import { authOptions } from '@libs/nextAuth';

import { SafeUser } from '../types';

export async function getSession() {
  const session = await getServerSession(authOptions);

  return session;
}

export async function getCurrentUser(): Promise<SafeUser | null> {
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
