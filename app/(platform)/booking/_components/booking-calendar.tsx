"use client";

import {
  isBefore,
  isMonday,
  isSunday,
  startOfDay,
} from 'date-fns';
import { format } from 'date-fns-tz';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useBookingStore from '@/hooks/useBookingStore';
import { cn } from '@/lib/utils';

import BookingTimePicker from './booking-time-picker';

const BookingCalendar = () => {
  const { date, setDate } = useBookingStore((state) => ({
    date: state.date || new Date(),
    setDate: state.setDate,
  }));

  const disabledDays = (day: Date) => {
    const today = startOfDay(new Date());
    return isSunday(day) || isMonday(day) || isBefore(day, today);
  };

  return (
    <section className="flex items-center justify-center gap-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", { timeZone: "America/Denver" })
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={disabledDays}
          />
        </PopoverContent>
      </Popover>
      <BookingTimePicker />
    </section>
  );
};

export default BookingCalendar;
