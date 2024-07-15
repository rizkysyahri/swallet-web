import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { SaveConfigWallet } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";

const useUpdateWallet = (id: string) => {
  const token = useCounterStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formWallet, setFormWallet] = React.useState<{
    walletName?: string;
    beginning_balance?: number;
  }>({
    walletName: "",
    beginning_balance: 0,
  });

  const handleWalletNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormWallet({
      ...formWallet,
      [e.target.name]: e.target.value,
    });
  };

  const handleBeginningBalanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormWallet({
      ...formWallet,
      beginning_balance:
        value === "" ? undefined : Math.max(0, parseFloat(value)),
    });
  };

  const { mutate: saveUpdateWallet } = useMutation({
    mutationFn: async (args: SaveConfigWallet) => {
      const updatedArgs = {
        ...args,
        beginning_balance:
          args.beginning_balance !== undefined
            ? Math.max(0, args.beginning_balance)
            : formWallet.beginning_balance,
      };

      await axiosInstance.put(`/wallet-settings/${id}`, updatedArgs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Pengaturan berhasil di perbarui",
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message || "Pengaturan gagal di perbarui",
      });
    },
  });

  return {
    saveUpdateWallet,
    handleBeginningBalanceChange,
    handleWalletNameChange,
    formWallet,
    setFormWallet,
  };
};

export default useUpdateWallet;
