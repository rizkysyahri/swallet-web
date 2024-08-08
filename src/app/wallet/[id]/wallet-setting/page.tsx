"use client";

import * as React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ModalDeleteWallet from "@/components/modal/modalWallet/ModalDeleteWallet";
import useDeleteWallet from "@/hooks/api/wallet/useDeleteWallet";
import useUpdateWallet from "@/hooks/api/wallet/useUpdateWallet";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IWalletDetail } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const params = useParams();
  const {
    handleBeginningBalanceChange,
    handleWalletNameChange,
    saveUpdateWallet,
    formWallet,
    setFormWallet,
  } = useUpdateWallet(params.id as string);
  const { deleteWallet } = useDeleteWallet(params.id as string);
  const router = useRouter();

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

  React.useEffect(() => {
    if (walletSetting) {
      setFormWallet({
        walletName: walletSetting.walletName || "",
        beginning_balance: walletSetting.beginning_balance || 0,
      });
    }
  }, [walletSetting, setFormWallet]);

  return (
    <section className="pt-14">
      <MaxWidthWrapper className=" lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8">
        <div className="col-span-2 px-6 lg:px-0 lg:pt-4 ">
          <div className="relative mx-auto flex flex-col">
            <div className="bg-black rounded-md w-[167px]">
              <div>
                <Button
                  variant="neu"
                  onClick={() =>
                    router.push(
                      `/wallet/${walletSetting?.id}/wallet-setting/categories`
                    )
                  }
                >
                  Pengaturan Kategori
                </Button>
              </div>
            </div>
            <h1 className="text-gray-600 text-2xl font-bold pt-10">
              Pengaturan utama
            </h1>

            <div className="pt-5">
              <div className="mb-4">
                <Label>Wallet Name</Label>
                <Input
                  className="w-full lg:w-[400px]"
                  name="walletName"
                  value={formWallet.walletName}
                  onChange={handleWalletNameChange}
                />
              </div>

              <div>
                <Label>Saldo awal</Label>
                <Input
                  className="w-full lg:w-[400px]"
                  name="beginning_balance"
                  value={formWallet.beginning_balance}
                  onChange={handleBeginningBalanceChange}
                />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="bg-white rounded-lg w-[170px] border-2 border-black">
              <Button
                onClick={() => saveUpdateWallet(formWallet)}
                variant="neuWhite"
              >
                Perbarui pengaturan
              </Button>
            </div>
          </div>
          <div className="border-b-2 border-gray-900 my-5 w-full" />

          <div className="flex justify-end">
            <ModalDeleteWallet onClick={() => deleteWallet()} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
