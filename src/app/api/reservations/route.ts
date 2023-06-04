import { NextRequest, NextResponse } from 'next/server';

import prismaClient from '@libs/prismaDb';

import { getCurrentUser } from '@helpers/getCurrentUser';

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, totalPrice, startDate, endDate } = body;

  const reservation = await prismaClient.reservation.create({
    data: {
      userId: currentUser.id,
      listingId,
      totalPrice,
      startDate,
      endDate,
    },
  });

  return NextResponse.json(reservation, {
    status: 201,
  });
}
