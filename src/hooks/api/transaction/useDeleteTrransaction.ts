import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTransaction = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast({
        description: "Deleted successfully",
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });

  return {
    deleteTransaction,
  };
};

export default useTransaction;
