import { NextRequest, NextResponse } from 'next/server';

import prismaClient from '@libs/prismaDb';

import { getCurrentUser } from '@helpers/getCurrentUser';

type Params = {
  reservationId: string;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId && typeof reservationId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Listing ID' },
      { status: 400 }
    );
  }

  await prismaClient.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json({ message: 'Reservation deleted successfully!' });
}
