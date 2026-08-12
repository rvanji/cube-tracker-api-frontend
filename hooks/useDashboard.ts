import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/services/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: getSummary,
  });
}
