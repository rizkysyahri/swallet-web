import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { IPostWallet, IWallet } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";

const ModalAddWallet = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const [inputWallet, setInputWallet] = React.useState<IPostWallet>({
    walletName: "",
    beginning_balance: 0,
  });

  const { mutate: saveWallet } = useMutation({
    mutationKey: ["wallet"],
    mutationFn: async (dto: IPostWallet) => {
      try {
        await axiosInstance.post("/wallet-settings", dto, {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputWallet({
      ...inputWallet,
      [name]: value,
    });
  };

  const handleChangeWallet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputWallet({
      ...inputWallet,
      [name]: parseFloat(value),
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 w-60 items-center bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 rounded-md">
        <Plus />
        Add Wallet
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription className="pt-4">
            <div className="flex gap-5">
              <div>
                <Label>Wallet name</Label>
                <Input
                  placeholder="Wallet name"
                  type="text"
                  name="walletName"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Wallet balance</Label>
                <Input
                  placeholder="0.00"
                  type="number"
                  name="beginning_balance"
                  onChange={handleChangeWallet}
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-5">
              <Button onClick={() => saveWallet(inputWallet)}>
                Add wallet
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddWallet;
