"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { IWalletDetail } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Wallet } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const [walletName, setWalletName] = useState("");
  const [beginningBalance, setBeginningBalance] = useState<number | "">("");

  const { toast } = useToast();

  const { data: walletSetting } = useQuery<IWalletDetail>({
    queryKey: ["wallet"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const res = await axiosInstance.get(`/wallet-settings/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    if (walletSetting) {
      setWalletName(walletSetting.walletName);
      setBeginningBalance(walletSetting.beginning_balance);
    }
  }, [walletSetting]);

  const handleWalletNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletName(e.target.value);
  };

  const handleBeginningBalanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBeginningBalance(
      e.target.value === "" ? "" : parseFloat(e.target.value)
    );
  };

  const handleUpdateSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      await axiosInstance.put(
        `/wallet-settings/${params.id}`,
        {
          walletName,
          beginning_balance: beginningBalance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        variant: "success",
        description: "Pengaturan berhasil di perbarui",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Pengaturan gagal di perbarui",
      });
    }
  };

  return (
    <section>
      <MaxWidthWrapper className="pt-14 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8">
        <div className="col-span-2 px-6 lg:px-0 lg:pt-4 ">
          <div className="relative mx-auto lg:text-left flex flex-col items-center lg:items-start">
            <h1 className="text-gray-600 text-2xl font-bold">
              Pengaturan utama
            </h1>

            <div className="pt-5">
              <div className="mb-4">
                <Label>Wallet Name</Label>
                <Input
                  className="w-[400px]"
                  value={walletName}
                  onChange={handleWalletNameChange}
                />
              </div>

              <div>
                <Label>Saldo awal</Label>
                <Input
                  className="w-[400px]"
                  value={beginningBalance}
                  onChange={handleBeginningBalanceChange}
                />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <Button onClick={handleUpdateSettings}>Perbarui pengaturan</Button>
          </div>
          <div className="border-b text-gray-900 my-5 w-[400px]" />

          <div className="flex justify-end w-[400px]">
            <Button variant="link">Hapus dompet</Button>
          </div>
        </div>

        <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 lg:pt-4 lg:mx-0 h-fit">
          <div className="relative md:max-w-md">
            <div className="bg-white h-64 w-96 rounded-[3.5rem] flex items-center justify-center">
              <Wallet className="w-28 h-28" />
            </div>

            <div className="pt-6">
              <div className="bg-white h-64 w-96 rounded-[3.5rem] flex items-center justify-center">
                <DollarSign className="w-28 h-28" />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
