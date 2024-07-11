import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/store";
import { useQuery } from "@tanstack/react-query";
import { AreaChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export function AreaChartHero() {
  const token = useCounterStore((state) => state.token)
  const { data } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosInstance.get("/wallet-settings/chart-data", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
  });
  return (
    <AreaChart
      className="h-80"
      data={data}
      index="date"
      categories={["Wallets", "Expenses"]}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
