import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategory, ITransactionUpdate } from "@/types/types";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { useToast } from "@/components/ui/use-toast";

interface IFormTransaction extends Omit<ITransactionUpdate, "id"> {
  id?: string;
}

const useUpdateTransaction = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [formTransaction, setFormTransaction] =
    React.useState<IFormTransaction>({
      id: "",
      categoryId: "",
      label: "",
      amount: -0,
    });

  const { data: categories } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const { mutate: saveTransactionUpdate } = useMutation({
    mutationFn: async (data: Omit<ITransactionUpdate, "id">) => {
      const id = formTransaction.id;
      await axiosInstance.put(`/transaction/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Updated transaction successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const handleChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Label changed:", e.target.value);
    setFormTransaction({
      ...formTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setFormTransaction({
      ...formTransaction,
      categoryId: categoryId,
    });
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    console.log("Amount changed:", value);

    if (!isNaN(parseFloat(value))) {
      value = parseFloat(value) < 0 ? value : "-" + Math.abs(parseFloat(value));
    } else {
      value = "-0";
    }

    setFormTransaction({
      ...formTransaction,
      [name]: parseFloat(value),
    });
  };

  const updateTransaction = () => {
    const { id, ...transactionData } = formTransaction;

    if (id) {
      saveTransactionUpdate(transactionData as ITransactionUpdate);
    } else {
      console.error("Transaction ID is required to update the transaction.");
    }
  };

  React.useEffect(() => {
    setFormTransaction((prevInput) => ({
      ...prevInput,
      amount: -0,
    }));
  }, []);

  return {
    updateTransaction,
    handleSelectCategory,
    handleChangeLabel,
    handleChangeAmount,
    formTransaction,
    setFormTransaction,
    categories,
  };
};

export default useUpdateTransaction;
