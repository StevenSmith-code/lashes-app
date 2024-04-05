"use client";
import React from 'react';

import { format } from 'date-fns';
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
    return bookedSlots[formattedDate]?.has(timeOption);
  };

  const handleTimeChange = (time12h: string) => {
    const time24h = convertTo24HourFormat(time12h);
    const datePart = date
      ? format(date, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    const fullDateTime = `${datePart}T${time24h}:00Z`;

    // Update the store with the new time

    setDate(new Date(datePart));
    setTime(time24h);

    console.log(fullDateTime); // Logs the full date-time string in ISO format
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
