import { z } from 'zod';

export const loginSchema = z.object({
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

export type LoginData = z.infer<typeof loginSchema>;
