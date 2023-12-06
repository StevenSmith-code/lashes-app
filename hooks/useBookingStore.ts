import { create } from 'zustand';

interface BookingState {
  date: Date | null;
  time: string;
  serviceName: string; // Add a new state variable for the service name
  setDate: (date: Date | null | undefined) => void;
  setTime: (time: string) => void;
  setServiceName: (serviceName: string) => void; // Add an action to update the service name
}

const useBookingStore = create<BookingState>((set) => ({
  date: null,
  time: "",
  serviceName: "",
  setDate: (date) => set({ date: date ?? null }),
  setTime: (time) => set({ time }),
  setServiceName: (serviceName) => set({ serviceName }), // Implement the action
}));

export default useBookingStore;
