import {
  format,
  setHours,
  setMinutes,
} from 'date-fns';
import { create } from 'zustand';

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
      const updatedTime = newTime ?? state.time;

      let dateTime = "";
      if (updatedDate && updatedTime) {
        // Parse the time part and convert it to 24-hour format
        const [time, modifier] = updatedTime.split(" ");
        let [hours, minutes] = time.split(":");
        hours =
          modifier === "PM" && hours !== "12"
            ? String(parseInt(hours, 10) + 12)
            : hours;
        hours = modifier === "AM" && hours === "12" ? "00" : hours;

        // Combine date and time in ISO 8601 format
        const combinedDate = setHours(
          setMinutes(updatedDate, parseInt(minutes)),
          parseInt(hours)
        );
        dateTime = format(combinedDate, "yyyy-MM-dd'T'HH:mm:ss");
      }

      return {
        date: updatedDate,
        time: updatedTime,
        dateTime,
      };
    });
  },
}));

export default useBookingStore;
