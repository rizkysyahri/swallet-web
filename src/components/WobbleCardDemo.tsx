"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { Wallet } from "lucide-react";
import { LineChartHero } from "./LineChart";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            You won&apos;t have to worry about calculating expenses anymore.
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With over 100,000 monthly active users, Swallet is the biggest
            Popular wallet expense management platform for everyone.
          </p>
        </div>

        <Image
          src="/images/dashboard.jpeg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 lg:-right-[20%] sm:-right-2 grayscale filter -bottom-7 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Take Control of Your Finances with Ease.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Simplify your expense management and achieve financial peace of mind.
          Swallet provides the tools you need to effortlessly track and control
          your spending.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-lg">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Watch your expenses drop—effortlessly manage your budget with our
            intuitive line charts.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Track your spending trends—simplify budgeting with our dynamic line
            charts.
          </p>
        </div>
        <div className="bg-slate-50 grainy-light rounded-md p-10 mt-4">
          <LineChartHero />
        </div>
      </WobbleCard>
    </div>
  );
}
