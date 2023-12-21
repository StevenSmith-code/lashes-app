import { z } from 'zod';

export const FormDataSchema = z.object({
  service: z.string().min(1, "Service is required"),
  dateTime: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
      "Invalid date and time format."
    ),
});
