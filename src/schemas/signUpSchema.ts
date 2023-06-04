import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'Name is required',
    })
    .min(3, {
      message: 'Name must be at least 3 characters',
    }),
  email: z
    .string()
    .nonempty({
      message: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    }),
  password: z
    .string()
    .nonempty({
      message: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .max(32, {
      message: 'Password must be at most 32 characters',
    }),
});

export type SignUpData = z.infer<typeof signUpSchema>;
