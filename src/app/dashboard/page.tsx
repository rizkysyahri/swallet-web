"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ModalAddWallet from "@/components/ModalAddWallet";
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
import { IWalletDetail } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const token = useCounterStore((state) => state.token);

  const { data, isLoading, isError } = useQuery<IWalletDetail[]>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get("/wallet-settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !Array.isArray(data)) {
    return <div>Error loading wallets</div>;
  }

  return (
    <>
      <section className="bg-slate-50 grainy-light">
        <MaxWidthWrapper className="pt-14">
          <div className="flex flex-col ">
            <h1 className="font-bold text-2xl text-gray-600">Dompet</h1>
            <div className="mt-5 flex flex-col sm:flex-row gap-5">
              {data.map((wallet) => (
                <Link key={wallet.id} href={`/wallet/${wallet.id}/transaction`}>
                  <Card className="w-full bg-[#ebfdef] border-none shadow-lg">
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
              ))}
              <ModalAddWallet />
            </div>
          </div>

          {/* <section className="pt-14">
            <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-6">
              <AreaChartHero />
              <BarListHero />
            </div>
          </section> */}
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Dashboard;
