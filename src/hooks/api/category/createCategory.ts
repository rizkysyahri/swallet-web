import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type ICategoryPost = {
  name: string;
};

const useCreateCategory = () => {
  const token = useCounterStore((state) => state.token);
  const [inputCategory, setIsInputCategory] = useState({
    name: "",
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: saveCategory } = useMutation({
    mutationFn: async (args: ICategoryPost) => {
      await axiosInstance.post("/category", args, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Create category successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  return {
    inputCategory,
    setIsInputCategory,
    saveCategory,
  };
};

export default useCreateCategory;
