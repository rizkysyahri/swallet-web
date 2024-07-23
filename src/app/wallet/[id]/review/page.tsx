"use client";

import React from "react";
import axiosInstance from "@/lib/axios";
import { IWalletDetail } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Recharts } from "@/components/chart/Rechart";
import { BarChartCategory } from "@/components/chart/BarChartCategory";

const Page = () => {
  const params = useParams();

  const { data: review } = useQuery<IWalletDetail>({
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

  return (
    <section className="bg-slate-50 pb-24">
      <MaxWidthWrapper className="pt-14">
        <div className="">
          <Recharts />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
