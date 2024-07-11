import { IWallet, IWalletDetail } from "@/types/types";
import { create } from "zustand";

type WalletStore = {
  wallet: IWalletDetail[];
  setWallet: (wallet: IWalletDetail[]) => void;
  getWalletById: () => IWalletDetail;
};

export const useWalletStore = create<WalletStore>((set, get) => ({
  wallet: [],
  setWallet: (wallet) => set({ wallet }),
  getWalletById: () => {
    return get().wallet[0];
  },
}));
