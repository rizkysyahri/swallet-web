"use client";

import * as React from "react";
import {
  Dialog,
  DialogClose,
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
import { useToast } from "@/components/ui/use-toast";

const ModalAddWallet = () => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const [inputWallet, setInputWallet] = React.useState<IPostWallet>({
    walletName: "",
    beginning_balance: 0,
  });

  const { toast } = useToast();

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
      toast({
        description: "created successfully",
        variant: "success",
      });
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
      <DialogTrigger className="bg-black w-60 h-9">
        <div className="flex gap-2 w-60 items-center bg-secondary text-secondary-foreground h-9 px-4 py-2 border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200">
          <Plus />
          Add Wallet
        </div>
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
          </DialogDescription>
        </DialogHeader>
        <DialogClose className="flex items-center justify-end">
          <div className="bg-black w-[107px] rounded-md">
            <Button onClick={() => saveWallet(inputWallet)} variant="neu">
              Add wallet
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddWallet;
