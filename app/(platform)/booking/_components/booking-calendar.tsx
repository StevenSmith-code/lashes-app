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
  isWithinInterval,
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
import { Appointment } from '@prisma/client';

interface BookingCalendarProps {
  onDateChange?: (date: Date) => void;
  withPopover?: boolean;
  appointments?: Appointment[];
}

const getAppointmentModifiers = (appointments: Appointment[]) => {
  const modifiers = {
    hasAppointment: appointments.map(
      (appointment) => new Date(appointment.dateTime)
    ),
  };
  return modifiers;
};

const BookingCalendar = ({
  onDateChange,
  withPopover,
  appointments,
}: BookingCalendarProps) => {
  const { date, setDate } = useBookingStore((state) => ({
    date: state.date,
    setDate: state.setDate,
  }));
  const [daysOff, setDaysOff] = useState<{ start: Date; end: Date }[]>([]);

  useEffect(() => {
    const fetchDaysOff = async () => {
      const getDaysOff = await getCalendarDaysOff();
      const daysOff = getDaysOff.map((dayOff) => ({
        start: dayOff.startDate,
        end: dayOff.endDate,
      }));
      setDaysOff(daysOff);
    };

    fetchDaysOff();
  }, []);

  const modifiers = getAppointmentModifiers(appointments || []);

  const isWithinDayOffRange = (
    day: Date,
    ranges: { start: Date; end: Date }[]
  ) => {
    return ranges.some((range) =>
      isWithinInterval(day, { start: range.start, end: range.end })
    );
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate); // Update the date in the store
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
      isWithinDayOffRange(day, daysOff)
    );
  };

  const calendarContent = (
    <Calendar
      mode="single"
      modifiers={modifiers}
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
