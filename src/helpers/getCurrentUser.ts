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
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      emailVerified: user.emailVerified?.toISOString() || undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    } satisfies SafeUser;
  } catch (error) {
    return null;
  }
}
