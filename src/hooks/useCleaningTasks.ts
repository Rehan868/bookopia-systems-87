
import { useQuery } from "@tanstack/react-query";
import { getCleaningTasks } from "@/services/mock-api";

export const useCleaningTasks = () => {
  return useQuery({
    queryKey: ["cleaningTasks"],
    queryFn: getCleaningTasks
  });
};
