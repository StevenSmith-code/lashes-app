import { z } from 'zod';

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const FormDataSchema = z.object({
  service: z.string().min(1, "Service is required"),
  dateTime: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
      "Invalid date and time format."
    ),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number format" }),
  email: z.string().email("This is not a valid email"),
});
