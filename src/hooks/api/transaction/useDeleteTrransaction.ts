import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTransaction = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();

  const { mutate: deleteTransaction } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await axiosInstance.delete(`/transaction/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });

  return {
    deleteTransaction,
  };
};

export default useTransaction;
