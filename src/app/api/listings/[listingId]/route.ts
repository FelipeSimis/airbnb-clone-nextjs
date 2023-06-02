import { NextRequest, NextResponse } from 'next/server';

import prismaClient from '@components/libs/prismaDb';

import { getCurrentUser } from '@helpers/getCurrentUser';

import { partialEditPropertySchema } from '@schemas/editPropertySchema';

type Params = {
  listingId: string;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId && typeof listingId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Listing ID' },
      { status: 400 }
    );
  }

  await prismaClient.listing.deleteMany({
    where: {
      AND: [{ userId: currentUser.id }, { id: listingId }],
    },
  });

  return NextResponse.json({ message: 'Listing deleted successfully!' });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId && typeof listingId !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Listing ID' },
      { status: 400 }
    );
  }

  const body = await request.json();

  const {
    title,
    description,
    price,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
  } = partialEditPropertySchema.parse(body);

  await prismaClient.listing.updateMany({
    where: {
      AND: [{ userId: currentUser.id }, { id: listingId }],
    },
    data: {
      title,
      description,
      price,
      image: imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location?.value,
    },
  });

  return NextResponse.json({ message: 'Listing updated successfully!' });
}
