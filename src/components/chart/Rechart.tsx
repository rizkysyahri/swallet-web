import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDate, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";
import { useCounterStore } from "@/stores/store";
import { IWalletDetail } from "@/types/types";

export const description = "An interactive bar chart";

const chartConfig = {
  pengeluaran: {
    label: "Pengeluaran",
    color: "hsl(var(--chart-2))",
  },
};

const generateDateRange = (startDate: Date, endDate: Date) => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export function Recharts() {
  const params = useParams();
  const token = useCounterStore((state) => state.token);

  const { data } = useQuery<IWalletDetail>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/wallet-settings/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });

  const startDate = new Date(2024, 6, 9);
  const endDate = new Date(2024, 11, 31);
  const dateRange = generateDateRange(startDate, endDate);

  const beginningBalance = data?.beginning_balance || 0;

  const chartData = dateRange.map((date) => {
    const expensesForDate =
      data?.expense
        .filter((expense) => {
          const expenseDate = new Date(expense.date);

          return (
            expenseDate.getFullYear() === date.getFullYear() &&
            expenseDate.getMonth() === date.getMonth() &&
            expenseDate.getDate() === date.getDate()
          );
        })
        .reduce(
          (acc, expense) =>
            acc +
            (typeof expense.amount === "string"
              ? parseFloat(expense.amount)
              : expense.amount),
          0
        ) || 0;

    return {
      date: formatDate(date),
      pengeluaran: Math.abs(expensesForDate), // Make expenses positive for chart display
      beginning_balance: beginningBalance,
    };
  });

  // Calculate total pengeluaran across all dates
  const totalPengeluaran = React.useMemo(
    () =>
      chartData?.reduce((acc, curr) => acc + (curr.pengeluaran ?? 0), 0) ?? 0,
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            <Image src="/swallet.png" alt="swallet" width={70} height={70} />
          </CardTitle>
          <CardDescription>
            Menampilkan total pengeluaran untuk 3 bulan terakhir
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.pengeluaran.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              -{formatPrice(totalPengeluaran).toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              dataKey="beginning_balance"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatPrice(value).toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="pengeluaran"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="pengeluaran" fill={chartConfig.pengeluaran.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
