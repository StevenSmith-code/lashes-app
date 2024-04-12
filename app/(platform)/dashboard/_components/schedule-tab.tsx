"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import {
  format,
  isSameDay,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { getAppointments } from '@/actions/get-appointments';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import ScheduleCalendar from './schedule-calendar';

interface Appointments {
  id: string;
  userId: string;
  serviceId: string;
  dateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  serviceName: string;
  userPhoneNumber: string;
}

const ScheduleTab = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        let { modifiedAppointments } = await getAppointments();
        modifiedAppointments.sort(
          (a, b) =>
            new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        );
        setAppointments(modifiedAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  return (
    <div className="w-full flex justify-center gap-4 ">
      <Card className="flex flex-col justify-center items-center max-w-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="mb-5">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleCalendar
            appointments={appointments}
            onDateChange={setSelectedDate}
          />
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
            {isLoading ? (
              <ScheduleTab.Skeleton />
            ) : (
              appointments
                ?.filter((appointment) =>
                  selectedDate
                    ? isSameDay(new Date(appointment.dateTime), selectedDate)
                    : true
                )
                .map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      {format(appointment.dateTime, "M/d/yyyy")}
                    </TableCell>
                    <TableCell>{appointment.name}</TableCell>
                    <TableCell>
                      {appointment.serviceName}{" "}
                      {appointment.price > 65 ? "Full set" : "Refill"}
                    </TableCell>
                    <TableCell>{appointment.userPhoneNumber}</TableCell>
                    <TableCell className="text-right">
                      {format(
                        utcToZonedTime(appointment.dateTime, "America/Denver"),
                        "h:mm a"
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ScheduleTab;

ScheduleTab.Skeleton = function SkeletonScheduleTab() {
  return (
    <>
      {new Array(5).fill(null).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
