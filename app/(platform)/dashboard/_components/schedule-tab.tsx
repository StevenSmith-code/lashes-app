"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { getAppointments } from '@/actions/get-appointments';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import BookingCalendar from '../../booking/_components/booking-calendar';

interface Appointments {
  id: string;
  userId: string;
  serviceId: string;
  dateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  serviceName: string;
  userPhoneNumber: string;
}

const ScheduleTab = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      let fetchedAppointments = await getAppointments();
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="w-full flex justify-center gap-4 ">
      <Card className="flex flex-col justify-center items-center max-w-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="mb-5">Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingCalendar appointments={appointments} />
        </CardContent>
      </Card>
      <Card className="w-2/5">
        <Table>
          <TableCaption>A list of your recent clients.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {format(appointment.dateTime, "M/d/yyyy")}
                </TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.serviceName}</TableCell>
                <TableCell>{appointment.userPhoneNumber}</TableCell>
                <TableCell className="text-right">
                  {format(
                    utcToZonedTime(appointment.dateTime, "UTC"),
                    "h:mm a"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ScheduleTab;
