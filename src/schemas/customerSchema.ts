import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export type CustomerFormInputs = z.infer<typeof customerSchema>;