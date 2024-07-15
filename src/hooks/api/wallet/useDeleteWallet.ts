import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteWallet = (id: string) => {
  const token = useCounterStore((state) => state.token);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {toast} = useToast()
  const { mutate: deleteWallet } = useMutation({
    mutationKey: ["deleteWallet"],
    mutationFn: async () => {
      await axiosInstance.delete(`wallet-settings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      router.push("/dashboard");
      toast({
        variant: "success",
        description: "Dompet berhasil di hapus",
      });
    },
  });

  return { deleteWallet };
};

export default useDeleteWallet;
