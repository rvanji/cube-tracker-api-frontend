import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReturn } from "@/services/returnService";

export function useUpdateReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateReturn(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
