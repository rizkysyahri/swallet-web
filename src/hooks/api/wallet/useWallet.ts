import axiosInstance from "@/lib/axios";
import { IWalletDetail } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useWallet = () => {
  const [wallet, setWallet] = useState<IWalletDetail>();
  const params = useParams();

  const data = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosInstance.get(`/wallet-settings/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWallet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    data();
  }, [params.id]);

  return { wallet };
};

export default useWallet;
