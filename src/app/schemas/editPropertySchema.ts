import { z } from 'zod';

const editPropertySchema = z.object({
  category: z.string(),
  location: z
    .object({
      flag: z.string(),
      label: z.string(),
      region: z.string(),
      value: z.string(),
      latlng: z.tuple([z.number(), z.number()]),
    })
    .nullable(),
  guestCount: z.number().nonnegative(),
  roomCount: z.number().nonnegative(),
  bathroomCount: z.number().nonnegative(),
  imageSrc: z.string().startsWith('https://res.cloudinary.com'),
  price: z
    .number()
    .nonnegative()
    .refine(value => !Number.isNaN(Number(value)), {
      message: 'Price must be a valid number',
    })
    .transform(value => Number(value)),
  title: z.string(),
  description: z.string(),
});

export const partialEditPropertySchema = editPropertySchema.partial();

export type EditPropertyData = z.infer<typeof partialEditPropertySchema>;
