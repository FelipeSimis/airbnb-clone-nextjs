import { NextRequest, NextResponse } from 'next/server';

import prismaClient from '@components/libs/prismaDb';

import { getCurrentUser } from '@helpers/getCurrentUser';

import { rentSchema } from '@schemas/rentSchema';

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    title,
    description,
    price,
  } = rentSchema.parse(body);

  Object.keys(body).forEach(value => {
    if (!body[value]) {
      return NextResponse.error();
    }

    return NextResponse.next();
  });

  const listing = await prismaClient.listing.create({
    data: {
      category,
      locationValue: String(location?.value),
      guestCount,
      roomCount,
      bathroomCount,
      image: imageSrc,
      title,
      description,
      price,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}
