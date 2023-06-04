import { z } from 'zod';

export const rentSchema = z.object({
  category: z.string().nonempty({
    message: 'Category is required',
  }),
  location: z
    .object({
      flag: z.string(),
      label: z.string().nonempty({
        message: 'Label is required',
      }),
      region: z.string().nonempty({
        message: 'Region is required',
      }),
      value: z.string().nonempty({
        message: 'Value is required',
      }),
      latlng: z.tuple([z.number(), z.number()]),
    })
    .nullable(),
  guestCount: z.number().nonnegative(),
  roomCount: z.number().nonnegative(),
  bathroomCount: z.number().nonnegative(),
  imageSrc: z
    .string()
    .nonempty({
      message: 'Image Source is required',
    })
    .startsWith('https://res.cloudinary.com'),
  price: z
    .number()
    .nonnegative()
    .refine(value => !Number.isNaN(Number(value)), {
      message: 'Price must be a valid number',
    })
    .transform(value => Number(value)),
  title: z.string().nonempty({
    message: 'Title is required',
  }),
  description: z.string().nonempty({
    message: 'Description is required',
  }),
});

export type RentFormData = z.infer<typeof rentSchema>;
