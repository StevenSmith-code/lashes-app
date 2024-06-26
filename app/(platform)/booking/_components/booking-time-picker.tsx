"use client";
import React from 'react';

import {
  format,
  utcToZonedTime,
  zonedTimeToUtc,
} from 'date-fns-tz';
import { Clock } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useBookingStore from '@/hooks/useBookingStore';
import { cn } from '@/lib/utils';

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  refillPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

type Appointment = {
  id: string;
  userId: string;
  serviceId: string;
  dateTime: Date;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  service: Service;
};
type BookedSlots = Record<string, Set<string>>;

interface BookingTimePickerProps {
  appointments: Appointment[];
  bookedSlots: BookedSlots;
}

const MST_TIMEZONE = "America/Denver";

const BookingTimePicker: React.FC<BookingTimePickerProps> = ({
  bookedSlots,
}) => {
  const { time, date, setDate, setTime } = useBookingStore((state) => ({
    time: state.time,
    date: state.date,
    setDate: state.setDate,
    setTime: state.setTime,
  }));

  const isTimeSlotBooked = (
    timeOption: string,
    selectedDate: Date
  ): boolean => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const time24h = convertTo24HourFormat(timeOption);
    return bookedSlots[formattedDate]?.has(time24h);
  };

  const handleTimeChange = (time12h: string) => {
    const time24h = convertTo24HourFormat(time12h);
    const zonedDate = date ? utcToZonedTime(date, MST_TIMEZONE) : new Date();
    const dateString = format(zonedDate, "yyyy-MM-dd", {
      timeZone: MST_TIMEZONE,
    });
    const dateTimeString = `${dateString}T${time24h}`;
    const mstDateTime = zonedTimeToUtc(dateTimeString, MST_TIMEZONE);

    setDate(mstDateTime);
    setTime(time12h);

    console.log("Date: " + mstDateTime + "Time: " + time12h);
  };
  // Generate time options directly without useMemo
  let timeOptions = ["Pick a date first."];
  if (date) {
    timeOptions = [];
    for (let hour = 11; hour <= 18; hour++) {
      if (hour === 14) continue; // Skip over any specifically closed hours like 14 (2 PM)

      const formattedHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const timeOption = `${formattedHour}:00 ${period}`;

      if (!isTimeSlotBooked(timeOption, date)) {
        timeOptions.push(timeOption);
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "bg-background hover:bg-primary-foreground transition px-4 py-2 rounded-md border border-zinc-200 flex items-center justify-center hover:text-black",
            { "text-muted-foreground": !time }
          )}
        >
          <Clock className="w-4 h-4 mr-2" />
          {time || "Select Time"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        {timeOptions.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => handleTimeChange(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookingTimePicker;

export function convertTo24HourFormat(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") hours = "00";
  if (modifier.toUpperCase() === "PM") hours = String(parseInt(hours, 10) + 12);

  return `${hours.padStart(2, "0")}:${minutes}`;
}
