"use server";

import { Inputs } from '@/app/(platform)/booking/_components/booking-form';

export async function postForm(data: Inputs) {
  console.log(data);
}
