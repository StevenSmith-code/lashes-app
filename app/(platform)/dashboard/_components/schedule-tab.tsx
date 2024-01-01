import React from 'react';

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

const ScheduleTab = () => {
  return (
    <div className="w-full flex justify-center gap-4 ">
      <Card className="flex flex-col justify-center items-center max-w-fit">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="mb-5">Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingCalendar />
        </CardContent>
      </Card>
      <Card className="w-2/5">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">12/1/2024</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>JohnDoe@gmail.com</TableCell>
              <TableCell className="text-right">12:00PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ScheduleTab;
