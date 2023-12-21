import { format } from 'date-fns';
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
        dateTime = format(updatedDate, "yyyy-MM-dd") + " " + updatedTime;
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
