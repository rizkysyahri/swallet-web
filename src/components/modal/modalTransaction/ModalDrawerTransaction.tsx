import * as React from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { ICategory, IPostTransaction } from "@/types/types";
import { useCounterStore } from "@/stores/zustand/store";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useToast } from "../../ui/use-toast";
import Image from "next/image";
import useWallet from "@/hooks/api/wallet/useWallet";

interface ModalDrawerTransactionProps {}

const ModalDrawerTransaction: React.FC<ModalDrawerTransactionProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const token = useCounterStore((state) => state.token);
  const [input, setInput] = React.useState<IPostTransaction>({
    walletId: params.id,
    categoryId: "",
    label: "",
    amount: -0,
  });
  const { wallet } = useWallet();

  const { toast } = useToast();
  const router = useRouter();

  const { data: categories } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    <Drawer>
      <DrawerTrigger className="bg-white border-2 border-black">
        {" "}
        <div className="flex gap-2 items-center bg-primary -translate-x-1 -translate-y-1 text-primary-foreground hover:bg-primary/90 hover:translate-x-0 hover:translate-y-0 h-9  px-3 transition duration-200">
          <Plus className="w-5 h-5" />
          Tambah transaksi
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tambah transaksi</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex items-center gap-x-2">
                <div className="flex flex-col space-y-2">
                  <Label className="text-slate-500 text-start">Kategori</Label>
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
                      <div
                        className="flex items-center gap-1 text-sm p-1 cursor-pointer  hover:bg-zinc-100 rounded-md"
                        onClick={() =>
                          router.push(
                            `/wallet/${wallet?.id}/wallet-setting/categories`
                          )
                        }
                      >
                        <Plus className="w-4 h-4" />
                        Tambah kategori
                      </div>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label className="text-slate-500 text-start">Label</Label>
                  <Input
                    placeholder="Label"
                    name="label"
                    onChange={(e) => handleChangeLabel(e)}
                    type="text"
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
                    onChange={(e) => handleChange(e)}
                    value={input.amount.toString()}
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
          <div className="flex flex-col items-center space-y-3 pt-5">
            <DrawerClose className="w-full" asChild>
              <div className="bg-black rounded-md">
                <Button
                  variant="secondary"
                  onClick={() => saveTransaction(input)}
                  className="w-full border-2 border-black -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition duration-200"
                >
                  Tambah transaksi
                </Button>
              </div>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalDrawerTransaction;
