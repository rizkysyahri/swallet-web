"use client";

import { AreaChartHero } from "@/components/AreaChartHero";
import { BarListHero } from "@/components/BarListHero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ModalAddWallet from "@/components/ModalAddWallet";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { formatPrice } from "@/lib/utils";
import { useWalletStore } from "@/stores/useWalletStore";
import { IWalletDetail } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { FC, useEffect } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const wallets = useWalletStore((state) => state.setWallet);
  const wallet = useWalletStore((state) => state.wallet);

  const { data, isLoading, isError } = useQuery<IWalletDetail[]>({
    queryKey: ["wallet"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const res = await axiosInstance.get("/wallet-settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        wallets(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      wallets(data);
    }
  }, [data, wallets]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading wallets</div>;
  }

  if (!Array.isArray(wallet)) {
    return <div>Invalid wallet data</div>;
  }

  return (
    <>
      <section className="bg-slate-50 grainy-light">
        <MaxWidthWrapper className="pt-14">
          <div className="flex flex-col ">
            <h1 className="font-bold text-2xl text-gray-600">Dompet</h1>
            <div className="mt-5 flex flex-col sm:flex-row gap-5">
              {wallet.map((wallets) => (
                <Link
                  key={wallets.id}
                  href={`/wallet/${wallets.id}/transaction`}
                >
                  <Card className="w-full bg-[#ebfdef] border-none shadow-lg">
                    <CardHeader>
                      <div className="flex gap-3">
                        <Wallet className="w-10 h-10" />
                        <div className="flex flex-col">
                          <CardTitle>{wallets.walletName}</CardTitle>
                          <CardDescription>Tunai</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <span className="font-bold text-green-500 text-3xl">
                        + {formatPrice(wallets.beginning_balance)}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <ModalAddWallet />
            </div>
          </div>

          <section className="pt-14">
            <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-6">
              <AreaChartHero />
              <BarListHero />
            </div>
          </section>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;
