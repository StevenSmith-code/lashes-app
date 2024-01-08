"use server";
import { db } from '@/lib/db';
import { clerkClient } from '@clerk/nextjs/server';

export async function getAppointments() {
  const appointments = await db.appointment.findMany({
    include: {
      service: true,
    },
  });

  const modifiedAppointments = await Promise.all(
    appointments.map(async (appointment) => {
      // Fetch user details for each appointment
      const user = await clerkClient.users.getUser(appointment.userId);

      // Extract phone number or set a default value
      const phoneNumber = user?.phoneNumbers[0] || "No phone number";

      return {
        ...appointment,
        serviceName: appointment.service.name,
        userPhoneNumber: phoneNumber.phoneNumber,
      };
    })
  );
  return modifiedAppointments;
}
