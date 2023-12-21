"use client";
import React from 'react';

import { Clock } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useBookingStore from '@/hooks/useBookingStore';
import { cn } from '@/lib/utils';

interface BookingTimePickerProps {
  onTimeChange: (time: string) => void;
}

const BookingTimePicker = ({ onTimeChange }: BookingTimePickerProps) => {
  const { time, setDateTime } = useBookingStore((state) => ({
    time: state.time,
    setDateTime: state.setDateTime,
  }));

  const handleTimeChange = (newTime: string) => {
    setDateTime(undefined, newTime); // Update the time in the store
    onTimeChange(newTime); // Update the time in the form
  };
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 11; hour <= 18; hour++) {
      // Format hours for 12-hour clock
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";

      options.push(`${formattedHour}:00 ${period}`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

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
