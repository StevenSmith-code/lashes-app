"use server";

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

interface DateRange {
  from: Date;
  to: Date;
}
interface DayOffSchema {
  dateRange: DateRange;
  startTime: string;
  endTime: string;
}

export async function postDayOff(data: DayOffSchema) {
  try {
    await db.dayOff.create({
      data: {
        startDate: data.dateRange.from,
        endDate: data.dateRange.to,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard");
}
