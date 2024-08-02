"use client";

import * as React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, Utensils, WalletMinimal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { IWalletDetail } from "@/types/types";
import ModalAddTransactions from "@/components/modal/modalTransaction/ModalAddTransactions";
import { formatDate, formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import useTransaction from "@/hooks/api/transaction/useDeleteTrransaction";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import ModalDeleteTransaction from "@/components/modal/modalTransaction/ModalDeleteTransaction";
import Image from "next/image";

const Transactions = () => {
  const params = useParams();
  const { deleteTransaction } = useTransaction();
  const {
    handleChangeLabel,
    handleSelectCategory,
    handleChangeAmount,
    formTransaction,
    categories,
    updateTransaction,
    setFormTransaction,
  } = useUpdateTransaction();
  const [selectedTransactions, setSelectedTransactions] = React.useState<
    Set<string>
  >(new Set());
  const [selectedTransactionId, setSelectedTransactionId] = React.useState<
    string | null
  >(null);

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

  const handleDeleteTransaction = () => {
    selectedTransactions.forEach((id) => {
      deleteTransaction(id);
    });

    setSelectedTransactions(new Set());
  };

  const handleOpenDialog = (transaction: any) => {
    setSelectedTransactionId(transaction.id);
    setFormTransaction({
      id: transaction.id,
      categoryId: transaction.category.id,
      label: transaction.label,
      amount: transaction.amount,
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
        <MaxWidthWrapper className="pt-14">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <ModalAddTransactions />
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
              <div key={idx}>
                <Dialog>
                  <DialogTrigger
                    className="w-full"
                    onClick={() => handleOpenDialog(transactions)}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        className="flex items-center"
                        onClick={(e) => e.stopPropagation()}
                        checked={selectedTransactions.has(transactions.id)}
                        onCheckedChange={() => {
                          handleCheckboxChange(transactions.id);
                        }}
                      />
                      <div className="bg-black w-full mt-4 rounded-2xl">
                        <Card className="border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200">
                          <CardHeader>
                            <CardTitle className="flex w-full justify-between">
                              <div>{formatDate(transactions.date)}</div>
                              <div className="text-slate-500">
                                {formatPrice(transactions.amount)}
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex items-center gap-3">
                            <span className="flex gap-3">
                              <Utensils /> {transactions.category.name}
                            </span>
                            <div className="flex items-center justify-center mx-auto">
                              <Badge
                                variant="secondary"
                                className="text-sm text-slate-500"
                              >
                                {transactions.label}
                              </Badge>
                            </div>
                            <span className="ml-auto text-slate-500">
                              {formatPrice(transactions.amount)}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl mx-auto">
                    <DialogTitle>Perubahan transaksi</DialogTitle>
                    <DialogDescription>
                      <div className="flex items-center gap-4">
                        <div>
                          <Label className="text-slate-500">Kategori</Label>
                          <Select
                            onValueChange={handleSelectCategory}
                            value={formTransaction.categoryId}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-slate-500">Label</Label>
                          <Input
                            placeholder="Label"
                            name="label"
                            type="text"
                            onChange={handleChangeLabel}
                            value={formTransaction.label}
                          />
                        </div>
                        <div>
                          <Label className="text-slate-500">Jumlah</Label>
                          <Input
                            placeholder="- 0.00"
                            className="w-32"
                            type="text"
                            name="amount"
                            onChange={handleChangeAmount}
                            value={formTransaction.amount?.toString()}
                          />
                        </div>
                        <div className="justify-center mt-5">
                          <Badge>IDR</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-5">
                        <div className="border-b border-gray-900">
                          <Image
                            src="/swallet.png"
                            alt="swallet"
                            className="w-20"
                            width={500}
                            height={500}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <DialogClose asChild>
                            <div className="bg-black rounded-md">
                              <Button
                                variant="secondary"
                                onClick={updateTransaction}
                                className="border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200"
                              >
                                Simpan perubahan
                              </Button>
                            </div>
                          </DialogClose>
                          <div className="bg-black rounded-md">
                            <Button
                              variant="destructive"
                              className="border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200"
                            >
                              Hapus transaksi
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Transactions;
