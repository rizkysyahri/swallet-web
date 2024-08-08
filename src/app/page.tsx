"use client";

import * as React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { WobbleCardDemo } from "@/components/WobbleCardDemo";
import { BarChart2, Clock, SlidersVertical } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-slate-50 grainy-light dark:bg-black dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative pb-24 sm:pb-32 lg:pb-52 ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <section>
          <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-12 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
            <div className="col-span-7 px-6 lg:px-0 lg:pt-4">
              <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start ">
                <div>
                  <Image
                    src="/swallet.png"
                    alt="swallet"
                    width={320}
                    height={320}
                  />
                </div>
                <div className="mt-5">
                  <h1 className="relative w-fit tracking-tight text-balance font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                    <span className="bg-sky-500 text-white px-2">
                      Management
                    </span>{" "}
                    Pengeluaran Anda
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-span-full lg:col-span-5 w-full mt-32 lg:mx-0 lg:mt-20 h-full border-2 border-solid border-black ">
              <div className="grid grid-cols-2 w-full h-[400px] lg:h-full">
                <div className="bg-black">
                  <div className="flex items-center justify-end w-full h-full -translate-x-1 -translate-y-1 bg-[#80AF81] hover:translate-x-0 hover:translate-y-0 transition-all duration-300">
                    <div className="w-0.5 h-full bg-black border-1 rounded-md" />
                    <div className="w-1/2 h-0.5 bg-black border-1 rounded-md" />
                  </div>
                </div>
                <div className="bg-black">
                  <div className="flex items-center justify-start w-full h-full -translate-x-1 -translate-y-1 bg-[#FFDE4D] hover:translate-x-0 hover:translate-y-0 transition-all duration-300">
                    <div className="w-1/2 h-0.5 bg-black border-1 rounded-md" />
                    <div className="w-0.5 h-full bg-black border-1 rounded-md" />
                  </div>
                </div>
                <div className="bg-black">
                  <div className="flex items-center justify-end w-full h-full -translate-x-1 -translate-y-1 bg-[#E68369] hover:translate-x-0 hover:translate-y-0 transition-all duration-300">
                    <div className="w-0.5 h-full bg-black border-1 rounded-md" />
                    <div className="w-1/2 h-0.5 bg-black border-1 rounded-md" />
                  </div>
                </div>
                <div className="bg-[#BB9AB1]">
                  <div className="flex items-center justify-start w-full h-full -translate-x-1 -translate-y-1 bg-[#dfff67] hover:translate-x-0 hover:translate-y-0 transition-all duration-300">
                    <div className="w-1/2 h-0.5 bg-black border-1 rounded-md" />
                    <div className="w-0.5 h-full bg-black border-1 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        <section>
          <MaxWidthWrapper className="flex flex-col items-center justify-center pb-24 sm:pb-32 lg:pb-52">
            <div>
              <Image
                src="/images/swallet-arrow.png"
                alt="swallet"
                width={128}
                height={128}
              />
            </div>
            <div className="mt-4">
              <h2 className="text-center font-bold  w-fit tracking-tight text-balance !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Experience Next-Gen Web Apps—Where Innovation{" "}
                <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 inline-block text-transparent bg-clip-text">
                  Meets Functionality
                </span>
              </h2>
              <div className="my-20 flex items-center justify-center">
                <p className="text-center text-gray-900 max-w-3xl text-md md:text-lg">
                  Take control of your finances effortlessly with Swallet. Our
                  user-friendly platform offers powerful tools to track, manage,
                  and optimize your spending. Whether you&apos;re budgeting for
                  personal use or managing business expenses, Swallet simplifies
                  the process with intuitive features and insightful analytics.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                <div className="flex gap-3">
                  <div className="bg-black w-10 h-10 rounded-2xl">
                    <div className="flex items-center justify-center border-4 border-green-500 bg-white -translate-x-1 -translate-y-1 rounded-2xl w-10 h-10 p-2 ">
                      <Clock className="w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold">Real-Time Expense Tracking</h3>
                    <div className="flex">
                      <p className="max-w-sm mt-2 md:mt-4 text-gray-500">
                        Stay updated with your spending patterns in real-time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-black w-10 h-10 rounded-2xl">
                    <div className="flex items-center justify-center border-4 border-green-500 bg-white -translate-x-1 -translate-y-1 rounded-2xl w-10 h-10 p-2 ">
                      <SlidersVertical className="w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold">Customizable Budgets</h3>
                    <div className="flex">
                      <p className="max-w-sm mt-2 md:mt-4 text-gray-500">
                        Set and adjust budgets to fit your financial goals.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-black w-10 h-10 rounded-2xl">
                    <div className="flex items-center justify-center border-4 border-green-500 bg-white -translate-x-1 -translate-y-1 rounded-2xl w-10 h-10 p-2 ">
                      <BarChart2 className="w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold">Visual Insights</h3>
                    <div className="flex">
                      <p className="max-w-sm mt-2 md:mt-4 text-gray-500">
                        Understand your financial health with detailed charts
                        and reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        <section>
          <MaxWidthWrapper className="flex flex-col">
            <div>
              <h2 className="text-3xl font-bold">
                Simple to manage your wallet
              </h2>
            </div>
            <div className="mt-8">
              <WobbleCardDemo />
            </div>
          </MaxWidthWrapper>
        </section>
      </div>
    </>
  );
}
