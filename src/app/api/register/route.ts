import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

import prismaClient from '@components/libs/prismaDb';

import { signUpSchema } from '@schemas/signUpSchema';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, password } = signUpSchema.parse(body);

  const hashedPassword = await hash(password, 14);

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
