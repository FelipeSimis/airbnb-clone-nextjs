import { NextRequest, NextResponse } from 'next/server';

import prismaClient from '@components/libs/prismaDb';

import { getCurrentUser } from '@helpers/getCurrentUser';

type Params = {
  listingId: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Listing ID' },
      { status: 400 }
    );
  }

  const favorites = await prismaClient.favorite.create({
    data: {
      userId: currentUser.id,
      listingId,
    },
    select: {
      user: true,
    },
  });

  return NextResponse.json(favorites, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Listing ID' },
      { status: 400 }
    );
  }

  await prismaClient.favorite.deleteMany({
    where: {
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json({ message: 'Favorite deleted with success!' });
}
