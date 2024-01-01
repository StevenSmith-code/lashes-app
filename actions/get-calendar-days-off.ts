"use server";
import { db } from '@/lib/db';

export async function getCalendarDaysOff() {
  const daysOff = db.dayOff.findMany();
  return daysOff;
}
