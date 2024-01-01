"use client";

import {
  useEffect,
  useState,
} from 'react';

import {
  format,
  isBefore,
  isMonday,
  isSameDay,
  isSunday,
  startOfDay,
} from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { getCalendarDaysOff } from '@/actions/get-calendar-days-off';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useBookingStore from '@/hooks/useBookingStore';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  onDateChange?: (date: Date) => void;
  withPopover?: boolean;
}

const BookingCalendar = ({
  onDateChange,
  withPopover,
}: BookingCalendarProps) => {
  const { date, setDateTime } = useBookingStore((state) => ({
    date: state.date,
    setDateTime: state.setDateTime,
  }));
  const [daysOff, setDaysOff] = useState<Date[]>([]);

  useEffect(() => {
    const fetchDaysOff = async () => {
      const getDaysOff = await getCalendarDaysOff();
      const daysOff = getDaysOff.map((dayOff) => new Date(dayOff.date));
      setDaysOff(daysOff);
    };

    fetchDaysOff();
  }, []);

  const isDayOff = (day: Date): boolean => {
    return daysOff.some((dayOff) => isSameDay(day, dayOff));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDateTime(newDate); // Update the date in the store
      if (onDateChange) {
        onDateChange(newDate); // Call the onDateChange prop if it exists
      }
    }
  };

  const disabledDays = (day: Date) => {
    const today = startOfDay(new Date());
    return (
      isSunday(day) ||
      isMonday(day) ||
      isBefore(day, today) ||
      isSameDay(day, today) ||
      isDayOff(day)
    );
  };

  const calendarContent = (
    <Calendar
      mode="single"
      selected={date ?? undefined}
      onSelect={handleDateChange}
      initialFocus
      disabled={disabledDays}
      className="rounded-md border shadow"
    />
  );

  return (
    <section className="flex items-center justify-center gap-x-4">
      {withPopover ? (
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
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            {calendarContent}
          </PopoverContent>
        </Popover>
      ) : (
        calendarContent // Render the calendar directly without Popover
      )}
    </section>
  );
};

export default BookingCalendar;
