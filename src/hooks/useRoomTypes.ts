
import { useQuery } from "@tanstack/react-query";
import { getRoomTypes } from "@/services/mock-api";

export const useRoomTypes = () => {
  return useQuery({
    queryKey: ["roomTypes"],
    queryFn: getRoomTypes
  });
};
