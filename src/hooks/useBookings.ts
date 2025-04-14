
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

export const useTodayCheckins = () => {
  return useQuery({
    queryKey: ["todayCheckins"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Get today's date in ISO format (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0];
      
      // Filter bookings for today's check-ins
      const todayCheckins = bookings.filter(booking => 
        booking.check_in === today && booking.status === "confirmed"
      );
      
      return todayCheckins;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTodayCheckouts = () => {
  return useQuery({
    queryKey: ["todayCheckouts"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Get today's date in ISO format (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0];
      
      // Filter bookings for today's check-outs
      const todayCheckouts = bookings.filter(booking => 
        booking.check_out === today && booking.status === "checked-in"
      );
      
      return todayCheckouts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
