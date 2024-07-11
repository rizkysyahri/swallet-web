import { LineChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 24",
    Wallet: 2890,
    Expenses: 2338,
  },
  {
    date: "Feb 24",
    Wallet: 2756,
    Expenses: 2103,
  },
  {
    date: "Mar 24",
    Wallet: 3324,
    Expenses: 2194,
  },
  {
    date: "Apr 24",
    Wallet: 3470,
    Expenses: 2108,
  },
  {
    date: "May 24",
    Wallet: 3475,
    Expenses: 1812,
  },
  {
    date: "Jun 24",
    Wallet: 3129,
    Expenses: 1726,
  },
  {
    date: "Jul 24",
    Wallet: 3490,
    Expenses: 1982,
  },
  {
    date: "Aug 24",
    Wallet: 0,
    Expenses: 0,
  },
  {
    date: "Sep 24",
    Wallet: 0,
    Expenses: 0,
  },
  {
    date: "Oct 24",
    Wallet: 0,
    Expenses: 0,
  },
  {
    date: "Nov 24",
    Wallet: 0,
    Expenses: 0,
  },
  {
    date: "Dec 24",
    Wallet: 0,
    Expenses: 0,
  },
];

const dataFormatter = (number: any) =>
  `$${Intl.NumberFormat("id").format(number).toString()}`;

export function LineChartHero() {
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Expenses completed
      </h3>
      <LineChart
        className="h-80"
        data={chartdata}
        index="date"
        categories={["Wallet", "Expenses"]}
        colors={["indigo", "rose"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </>
  );
}
