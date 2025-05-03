
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/services/mock-api";

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getProperties
  });
};
