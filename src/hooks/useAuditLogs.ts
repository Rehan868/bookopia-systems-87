
import { auditLogs } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";

export const useAuditLogs = () => {
  return useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return auditLogs;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
