
import { bookings } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return bookings;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const booking = bookings.find(b => b.id === id);
      
      if (!booking) {
        throw new Error(`Booking with ID ${id} not found`);
      }
      
      return booking;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
