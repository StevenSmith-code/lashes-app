import {
  format,
  setHours,
  setMinutes,
} from 'date-fns';
import { create } from 'zustand';

import {
  convertTo24HourFormat,
} from '@/app/(platform)/booking/_components/booking-time-picker';

interface BookingState {
  date: Date | null;
  time: string;
  serviceName: string;
  dateTime: string; // Combined date and time
  setDate: (date: Date | null | undefined) => void;
  setTime: (time: string) => void;
  setServiceName: (serviceName: string) => void;
  setDateTime: (date?: Date | null, time?: string) => void; // New action
}

const useBookingStore = create<BookingState>((set) => ({
  date: null,
  time: "",
  serviceName: "",
  dateTime: "",
  setDate: (date) => set({ date: date ?? null }),
  setTime: (time) => set({ time }),
  setServiceName: (serviceName) => set({ serviceName }),
  setDateTime: (newDate, newTime) => {
    set((state) => {
      const updatedDate = newDate ?? state.date;
      let dateTime = "";
      let formattedTime = "";

      if (updatedDate && newTime) {
        const time24h = convertTo24HourFormat(newTime);
        let [hours, minutes] = time24h.split(":");

        // Combine date and time in ISO 8601 format
        const combinedDate = setHours(
          setMinutes(updatedDate, parseInt(minutes, 10)),
          parseInt(hours, 10)
        );
        dateTime = format(combinedDate, "yyyy-MM-dd'T'HH:mm:ss");
        formattedTime = format(combinedDate, "HH:mm"); // Use this to display just the time
      }

      return {
        date: updatedDate,
        time: formattedTime, // Update with just the formatted time
        dateTime,
      };
    });
  },
}));

export default useBookingStore;
