"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ModalAddWallet from "@/components/modal/modalWallet/ModalAddWallet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { formatPrice } from "@/lib/utils";
import { useCounterStore } from "@/stores/zustand/store";
import { useQuery } from "@tanstack/react-query";
import { MessageSquareWarning, Wallet } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const token = useCounterStore((state) => state.token);

  const { data: dataWallet, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get("/wallet-settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="bg-slate-50 grainy-light">
        <MaxWidthWrapper className="pt-14">
          <div className="flex flex-col ">
            <h1 className="font-bold text-2xl text-gray-600">Dompet</h1>
            <div className="mt-5 flex flex-col sm:flex-row gap-5">
              {dataWallet && dataWallet.length > 0 ? (
                dataWallet.map((wallet: any) => (
                  <Link
                    key={wallet.id}
                    href={`/wallet/${wallet.id}/transaction`}
                    className="bg-black rounded-2xl"
                  >
                    <Card className="w-full bg-[#ebfdef] border-2 border-black translate-x-0 translate-y-0 hover:-translate-x-1 hover:-translate-y-1 transition duration-200">
                      <CardHeader>
                        <div className="flex gap-3">
                          <Wallet className="w-10 h-10" />
                          <div className="flex flex-col">
                            <CardTitle>{wallet.walletName}</CardTitle>
                            <CardDescription>Tunai</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <span className="font-bold text-green-500 text-3xl">
                          + {formatPrice(wallet.beginning_balance)}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <span>No wallet data available</span>
              )}
              <div>
                <ModalAddWallet />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Dashboard;
