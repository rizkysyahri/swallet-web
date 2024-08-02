import axiosInstance from "@/lib/axios";
import { useCounterStore } from "@/stores/zustand/store";
import { ICategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = () => {
  const token = useCounterStore((state) => state.token);

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
  return { categories };
};

export default useGetCategory;
