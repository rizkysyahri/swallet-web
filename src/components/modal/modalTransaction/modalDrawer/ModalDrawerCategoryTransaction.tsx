"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/api/use-media-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import useTransaction from "@/hooks/api/transaction/useDeleteTrransaction";
import { IExpense } from "@/types/types";

interface ModalDrawerDialogTransactionProps {
  date: string;
  amount: string;
  categoryName: string;
  label: string;
  deleteId: string;
  transactionsInitial: IExpense;
}

const ModalDrawerDialogTransaction: React.FC<
  ModalDrawerDialogTransactionProps
> = ({ date, amount, categoryName, label, deleteId, transactionsInitial }) => {
  const {
    handleChangeLabel,
    handleSelectCategory,
    handleChangeAmount,
    formTransaction,
    categories,
    updateTransaction,
    setFormTransaction,
  } = useUpdateTransaction();
  const { deleteTransaction } = useTransaction();
  const [selectedTransactionId, setSelectedTransactionId] = React.useState<
    string | null
  >(null);

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenDialog = (transaction: any) => {
    setSelectedTransactionId(transaction.id);
    setFormTransaction({
      id: transaction.id,
      categoryId: transaction.category.id,
      label: transaction.label,
      amount: transaction.amount,
    });
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="w-full"
          onClick={() => handleOpenDialog(transactionsInitial)}
          asChild
        >
          <div className="bg-black w-full mt-4 rounded-2xl">
            <Card className="border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200">
              <CardHeader>
                <CardTitle className="flex w-full justify-between">
                  <div>{date}</div>
                  <div className="text-slate-500">{amount}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <span className="flex gap-3">{categoryName}</span>
                <div className="flex items-center justify-center mx-auto">
                  <Badge variant="secondary" className="text-sm text-slate-500">
                    {label}
                  </Badge>
                </div>
                <span className="ml-auto text-slate-500">{amount}</span>
              </CardContent>
            </Card>
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
                      <SelectItem key={category.id} value={category.id}>
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
                <DialogClose asChild>
                  <div className="bg-black rounded-md">
                    <Button
                      variant="destructive"
                      onClick={() => deleteTransaction(deleteId)}
                      className="border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200"
                    >
                      Hapus transaksi
                    </Button>
                  </div>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className="w-full"
        onClick={() => handleOpenDialog(transactionsInitial)}
        asChild
      >
        <div className="flex items-center gap-4">
          <div className="bg-black w-full mt-4 rounded-2xl">
            <Card className="border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200">
              <CardHeader>
                <CardTitle className="flex w-full justify-between">
                  <div>{date}</div>
                  <div className="text-slate-500">{amount}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <span className="flex gap-3">{categoryName}</span>
                <div className="flex items-center justify-center mx-auto">
                  <Badge variant="secondary" className="text-sm text-slate-500">
                    {label}
                  </Badge>
                </div>
                <span className="ml-auto text-slate-500">{amount}</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Perubahan transaksi</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex items-center gap-x-2">
                <div className="flex flex-col space-y-2">
                  <Label className="text-slate-500 text-start">Kategori</Label>
                  <Select
                    onValueChange={handleSelectCategory}
                    value={formTransaction.categoryId}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label className="text-slate-500 text-start">Label</Label>
                  <Input
                    placeholder="Label"
                    name="label"
                    type="text"
                    onChange={handleChangeLabel}
                    value={formTransaction.label}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="flex flex-col space-y-2">
                  <Label className="text-slate-500 text-start">Jumlah</Label>
                  <Input
                    placeholder="- 0.00"
                    className="w-[180px]"
                    type="text"
                    name="amount"
                    onChange={handleChangeAmount}
                    value={formTransaction.amount}
                  />
                </div>
                <div className="justify-center mt-5">
                  <Badge>IDR</Badge>
                </div>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex flex-col items-center justify-between space-y-3 pt-5">
            <DrawerClose asChild>
              <div className="bg-black rounded-md w-full">
                <Button
                  variant="secondary"
                  onClick={updateTransaction}
                  className="w-full border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200"
                >
                  Simpan perubahan
                </Button>
              </div>
            </DrawerClose>
            <DrawerClose asChild>
              <div className="bg-black rounded-md w-full">
                <Button
                  variant="destructive"
                  onClick={() => deleteTransaction(deleteId)}
                  className="w-full border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200"
                >
                  Hapus transaksi
                </Button>
              </div>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalDrawerDialogTransaction;
