import React from 'react';

import {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDataSchema } from '@/lib/formSchema';

interface BookingPersonalProps {
  register: UseFormRegister<z.infer<typeof FormDataSchema>>;
  errors: FieldErrors<z.infer<typeof FormDataSchema>>;
  updateFormData: (
    fieldName: keyof z.infer<typeof FormDataSchema>,
    value: string
  ) => void;
}

const BookingPersonal = ({
  register,
  errors,
  updateFormData,
}: BookingPersonalProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="col-span-2 flex flex-col items-start justify-between">
        <Label
          htmlFor="firstName"
          className="text-sm font-medium leading-none mb-2"
        >
          First name:
        </Label>
        <Input
          id="firstName"
          {...register("firstName", {
            onChange: (e) => updateFormData("firstName", e.target.value),
          })}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm font-medium leading-none">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div className="col-span-2 flex flex-col items-start justify-between">
        <Label
          htmlFor="lastName"
          className="text-sm font-medium leading-none mb-2"
        >
          Last name:
        </Label>
        <Input
          id="lastName"
          {...register("lastName", {
            onChange: (e) => updateFormData("lastName", e.target.value),
          })}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm font-medium leading-none">
            {errors.lastName.message}
          </p>
        )}
      </div>
      <div className="col-span-2 flex flex-col items-start justify-between">
        <Label
          htmlFor="email"
          className="text-sm font-medium leading-none mb-2"
        >
          Email:
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            onChange: (e) => updateFormData("email", e.target.value),
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm font-medium leading-none">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="col-span-2 flex flex-col items-start justify-between">
        <Label
          htmlFor="phoneNumber"
          className="text-sm font-medium leading-none mb-2"
        >
          Phone number:
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber", {
            onChange: (e) => updateFormData("phoneNumber", e.target.value),
          })}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm font-medium leading-none">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingPersonal;
