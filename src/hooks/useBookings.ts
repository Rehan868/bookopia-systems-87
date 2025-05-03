
import { useQuery } from "@tanstack/react-query";
import { getBookings, getBooking, getTodayCheckins, getTodayCheckouts } from "@/services/mock-api";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    enabled: !!id
  });
};

export const useTodayCheckins = () => {
  return useQuery({
    queryKey: ["todayCheckins"],
    queryFn: getTodayCheckins
  });
};

export const useTodayCheckouts = () => {
  return useQuery({
    queryKey: ["todayCheckouts"],
    queryFn: getTodayCheckouts
  });
};
