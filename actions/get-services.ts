"use server";

import { db } from '@/lib/db';

export const ServiceList = async () => {
  const services = await db.service.findMany();

  return services;
};
