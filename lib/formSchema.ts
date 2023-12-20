import { z } from 'zod';

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  service: z.string().min(1, "Service is required"),
});
