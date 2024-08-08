"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, WalletMinimal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { IWalletDetail } from "@/types/types";
import { formatDate, formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axiosInstance from "@/lib/axios";
import ModalAddTransactions from "@/components/modal/modalTransaction/ModalAddTransactions";
import useTransaction from "@/hooks/api/transaction/useDeleteTrransaction";
import ModalDeleteTransaction from "@/components/modal/modalTransaction/ModalDeleteTransaction";
import ModalDrawerTransaction from "@/components/modal/modalTransaction/ModalDrawerTransaction";
import ModalDrawerDialogTransaction from "@/components/modal/modalTransaction/modalDrawer/ModalDrawerCategoryTransaction";

const Transactions = () => {
  const params = useParams();
  const { deleteTransaction } = useTransaction();
  const [selectedTransactions, setSelectedTransactions] = React.useState<
    Set<string>
  >(new Set());

  const { data: transaction, isLoading } = useQuery<IWalletDetail>({
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

  if (isLoading) {
    return <div>loading....</div>;
  }

  const handleDeleteTransaction = () => {
    selectedTransactions.forEach((id) => {
      deleteTransaction(id);
    });

    setSelectedTransactions(new Set());
  };

  const handleCheckboxChange = (transactionId: string) => {
    setSelectedTransactions((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(transactionId)) {
        newSelected.delete(transactionId);
      } else {
        newSelected.add(transactionId);
      }

      return newSelected;
    });
  };

  const expenditureBalance =
    transaction?.expense?.reduce((total, expense) => {
      const amount =
        typeof expense.amount === "string"
          ? parseFloat(expense.amount)
          : expense.amount;
      return total + (amount || 0);
    }, 0) || 0;

  const currentBalance = expenditureBalance;

  return (
    <>
      <section className="bg-slate-50">
        <MaxWidthWrapper className="pt-14 pb-14">
          <div>
            <div className="flex items-center justify-between">
              <div className="md:block hidden">
                <ModalAddTransactions />
              </div>
              <div className="block md:hidden">
                <ModalDrawerTransaction />
              </div>
              <div>
                {selectedTransactions.size > 0 && (
                  <ModalDeleteTransaction onClick={handleDeleteTransaction} />
                )}
              </div>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-7 md:gap-10">
              <div className="bg-[#6EACDA] w-full rounded-2xl ">
                <Card className="border-2 border-black translate-x-0 translate-y-0 hover:-translate-x-2 hover:-translate-y-2 transition duration-200">
                  <CardHeader>
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <CardTitle>
                          <div className="bg-teal-50 px-2 py-2 w-10 rounded-2xl">
                            <WalletMinimal />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            Saldo dompet
                          </span>
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="font-bold text-green-500 text-2xl">
                      {formatPrice(transaction?.beginning_balance as number)}
                    </span>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-[#FFB200] rounded-2xl w-full">
                <Card className="border-2 border-black translate-x-0 translate-y-0 hover:-translate-x-2 hover:-translate-y-2 transition duration-200">
                  <CardHeader>
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <CardTitle>
                          <div className="bg-rose-100 px-2 py-2 w-10 rounded-2xl">
                            <CreditCard />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            Saldo pengeluaran
                          </span>
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="font-bold text-red-500 text-2xl">
                      {formatPrice(currentBalance)}
                    </span>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full bg-[#81A263] rounded-2xl">
                <Card className="border-2 border-black translate-x-0 translate-y-0 hover:-translate-x-2 hover:-translate-y-2 transition duration-200">
                  <CardHeader>
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <CardTitle>
                          <div className="bg-rose-100 px-2 py-2 w-10 rounded-2xl">
                            <CreditCard />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            Saldo pengeluaran
                          </span>
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="font-bold text-red-500 text-2xl">
                      {formatPrice(currentBalance)}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="pt-8">
            {transaction?.expense?.map((transactions, idx) => (
              <div className="flex items-center gap-4" key={idx}>
                <Checkbox
                  className="items-center md:block hidden"
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedTransactions.has(transactions.id)}
                  onCheckedChange={() => {
                    handleCheckboxChange(transactions.id);
                  }}
                />

                <ModalDrawerDialogTransaction
                  date={formatDate(transactions.date)}
                  amount={formatPrice(transactions.amount)}
                  categoryName={transactions.category.name}
                  label={transactions.label}
                  deleteId={transactions.id}
                  transactionsInitial={transactions}
                />
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Transactions;
