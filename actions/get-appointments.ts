"use server";
import { db } from '@/lib/db';

export async function getAppointments() {
  const appointments = await db.appointment.findMany({
    include: {
      service: true,
    },
  });

  const modifiedAppointments = appointments.map((appointment) => ({
    ...appointment,
    serviceName: appointment.service.name,
  }));

  return modifiedAppointments;
}
