import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name is required' })
    .regex(/^[A-Za-z ]+$/, { message: 'Name must only contain letters and spaces' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
