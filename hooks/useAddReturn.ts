import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReturn } from "@/services/returnService";

export function useAddReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["returns"] });
    },
  });
}
