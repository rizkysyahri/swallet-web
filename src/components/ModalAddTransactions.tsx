import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ICategory, IPostTransaction } from "@/types/types";
import { useCounterStore } from "@/stores/store";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useToast } from "./ui/use-toast";
import Image from "next/image";

interface ModalAddTransactionsProps {}

const ModalAddTransactions: React.FC<ModalAddTransactionsProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const token = useCounterStore((state) => state.token);
  const [input, setInput] = React.useState<IPostTransaction>({
    walletId: params.id,
    categoryId: "",
    label: "",
    amount: -0,
  });

  const { data: categories } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category");
      return response.data;
    },
  });

  const { mutate: saveTransaction } = useMutation({
    mutationFn: async (args: IPostTransaction) => {
      try {
        await axiosInstance.post("/transaction", args, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    onError: () => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Transaction was created successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });

  const handleChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Ensure that the value is always negative
    if (!isNaN(parseFloat(value))) {
      value = parseFloat(value) < 0 ? value : "-" + Math.abs(parseFloat(value));
    } else {
      value = "-0";
    }

    setInput({
      ...input,
      [name]: parseFloat(value),
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setInput({
      ...input,
      categoryId: categoryId,
    });
  };

  React.useEffect(() => {
    setInput((prevInput) => ({
      ...prevInput,
      amount: -0,
    }));
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex gap-2 items-center  bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 rounded-md px-3">
          <Plus className="w-5 h-5" />
          Tambah transaksi
        </DialogTrigger>
        <DialogContent className="max-w-2xl mx-auto">
          <DialogTitle>Tambah transaksi</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4">
              <div>
                <Label className="text-slate-500">Kategori</Label>
                <Select onValueChange={handleCategoryChange}>
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
                  onChange={(e) => handleChangeLabel(e)}
                  type="text"
                />
              </div>
              <div>
                <Label className="text-slate-500">Jumlah</Label>
                <Input
                  placeholder="- 0.00"
                  className="w-32"
                  type="text"
                  name="amount"
                  onChange={(e) => handleChange(e)}
                  value={input.amount.toString()}
                />
              </div>
              <div className="justify-center mt-5">
                <Badge>IDR</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5">
              <div className="border-b border-gray-900">
                <Image src="/swallet.png" alt="swallet" className="w-20" />
              </div>
              <div>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    onClick={() => saveTransaction(input)}
                  >
                    Tambah transaksi
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalAddTransactions;
