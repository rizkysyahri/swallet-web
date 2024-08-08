import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCategoryById = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Category deleted successfully",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    deleteCategory,
  };
};

export default useDeleteCategoryById;
