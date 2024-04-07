import { create } from 'zustand';

interface BookingState {
  date: Date | null;
  time: string;
  serviceName: string;
  dateTime: string; // Combined date and time
  setDate: (date: Date | null | undefined) => void;
  setTime: (time: string) => void;
  setServiceName: (serviceName: string) => void;
}

const useBookingStore = create<BookingState>((set) => ({
  date: null,
  time: "",
  serviceName: "",
  dateTime: "",
  setDate: (date) => set({ date: date ?? null }),
  setTime: (time) => set({ time }),
  setServiceName: (serviceName) => set({ serviceName }),
}));

export default useBookingStore;
