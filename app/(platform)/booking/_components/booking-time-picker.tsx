"use client";
import React, { useMemo } from 'react';

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
  onTimeChange: (time: string) => void;
  appointments: Appointment[];
  bookedSlots: BookedSlots;
}

const BookingTimePicker: React.FC<BookingTimePickerProps> = ({
  onTimeChange,
  appointments,
  bookedSlots,
}) => {
  const { time, date, setDateTime } = useBookingStore((state) => ({
    time: state.time,
    date: state.date,
    setDateTime: state.setDateTime,
  }));

  // Use the bookedSlots data to determine if a time slot is booked
  const isTimeSlotBooked = (
    timeOption: string,
    selectedDate: Date
  ): boolean => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    return bookedSlots[formattedDate]?.has(timeOption);
  };

  const handleTimeChange = (newTime: string) => {
    // Update the time in the store
    setDateTime(date, newTime);
    // Update the time in the form
    onTimeChange(newTime);
  };
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 11; hour <= 18; hour++) {
      // Format hours for 12-hour clock
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const timeOption = `${formattedHour}:00 ${period}`;
      if (!isTimeSlotBooked(timeOption, date!)) {
        options.push(timeOption);
      }
    }
    return options;
  };

  const timeOptions = useMemo(() => {
    if (!date) return [];
    const options = [];
    for (let hour = 11; hour <= 18; hour++) {
      // Format hours for 12-hour clock
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const timeOption = `${formattedHour}:00 ${period}`;
      if (!isTimeSlotBooked(timeOption, date!)) {
        options.push(timeOption);
      }
    }
    return options;
  }, [date, appointments]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "bg-background hover:bg-primary-foreground transition px-4 py-2 rounded-md border border-zinc-200 flex items-center justify-center hover:text-black",
            {
              "text-muted-foreground": !time,
            }
          )}
        >
          <Clock className="w-4 h-4 mr-2" />
          {`${time} MST` || "Select Time"}
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
