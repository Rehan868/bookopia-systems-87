
import { rooms } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return rooms;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const room = rooms.find(r => r.id === id);
      
      if (!room) {
        throw new Error(`Room with ID ${id} not found`);
      }
      
      return room;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
